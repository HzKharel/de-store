import { CustomerOrderInterface } from '../Interfaces/CustomerOrderInterface';
import { OrderedProductData } from '../Interfaces/OrderedProductData';
import { PlacedOrderInterface } from '../Interfaces/PlacedOrderInterface';
import { PaymentEnum } from '../Interfaces/PaymentEnum';

export function newOrderFactory(
  customerOrder: CustomerOrderInterface,
  itemDetails: OrderedProductData[],
): PlacedOrderInterface {
  const newOrder: PlacedOrderInterface = {
    ...customerOrder,
    items: [],
    status:
      customerOrder.paymentType === PaymentEnum.FINANCE
        ? PaymentEnum.AWAITING_APPROVAL
        : PaymentEnum.PAID,
    total: 0,
  };

  for (const order of customerOrder.items) {
    const orderedItemData = itemDetails.find(
      (i) => i.productId === order.productId,
    );
    if (orderedItemData) {
      newOrder.items.push({
        productName: orderedItemData.productName,
        productPrice: orderedItemData.productPrice,
        quantity: order.quantity,
      });

      newOrder.total += order.quantity * orderedItemData.productPrice;
    }
  }

  return newOrder;
}
