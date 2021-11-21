import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerOrderInterface } from '../../Interfaces/CustomerOrderInterface';
import axios from 'axios';
import { OrderedProductData } from '../../Interfaces/OrderedProductData';
import { PlacedOrderInterface } from '../../Interfaces/PlacedOrderInterface';
import { newOrderFactory } from '../../Factory/NewOrderFactory';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaDefinition } from '../../Schema/SchemaDefinition';
import { v4 as uuid } from 'uuid';
import { CustomerOrderItemsInterface } from '../../Interfaces/CustomerOrderItemsInterface';
import { FinanceDecisionInterface } from '../../Interfaces/FinanceDecisionInterface';
import { PaymentEnum } from '../../Interfaces/PaymentEnum';
import { MailInterface } from '../../Interfaces/MailInterface';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(SchemaDefinition.OrderSchema)
    private readonly ordersDB: Model<PlacedOrderInterface>,
  ) {}

  async getNameAndPriceOfItems(items: string[]): Promise<OrderedProductData[]> {
    return (
      await axios.post(
        'http://localhost:3001/inventory/productDetails',
        items,
        { headers: { token: 'order-service' } },
      )
    ).data as OrderedProductData[];
  }

  stockQuantityControl(items: CustomerOrderItemsInterface[]) {
    axios
      .post('http://localhost:3001/inventory/reduceProductQuantity', items, {
        headers: { token: 'order-service' },
      })
      .then();
  }

  async placeOrder(customerOrder: CustomerOrderInterface) {
    //get name and price for the ordered items
    const itemDetails: OrderedProductData[] = await this.getNameAndPriceOfItems(
      customerOrder.items.map((i) => i.productId),
    );
    const newOrder: PlacedOrderInterface = newOrderFactory(
      customerOrder,
      itemDetails,
    );

    newOrder.orderId = uuid();
    await this.ordersDB.create(newOrder);

    this.stockQuantityControl(customerOrder.items);

    if (newOrder.paymentType === PaymentEnum.FINANCE) {
      const mail: MailInterface = {
        mailType: 'FINANCE',
        message: `${newOrder.customerName} is looking to get finance for the purchase amount ${newOrder.total}`,
        read: false,
        targetId: newOrder.orderId,
        title: `Finance request for ${newOrder.customerName}`,
      };
      await axios.post('http://localhost:3004/mail/sendNewMail', mail, {
        headers: { token: 'order-service' },
      });
    }
    return newOrder;
  }

  async financeDecision(financeData: FinanceDecisionInterface) {
    const order: PlacedOrderInterface = await this.ordersDB.findOne({
      orderId: financeData.orderId,
    });
    console.log(order);
    if (order) {
      await this.ordersDB.findOneAndUpdate(
        { orderId: financeData.orderId },
        {
          status:
            financeData.financeState === 'APPROVED'
              ? PaymentEnum.FINANCE_APPROVED
              : PaymentEnum.FINANCE_REJECTED,
        },
      );

      return 'OK';
    }

    throw new HttpException('Unable to find order', HttpStatus.NOT_FOUND);
  }

  async getAllOrders() {
    return this.ordersDB.find();
  }
}
