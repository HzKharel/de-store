import { CustomerOrderItemsInterface } from './CustomerOrderItemsInterface';
import { OrderedItemInterface } from './OrderedItemInterface';
import { PaymentEnum } from './PaymentEnum';

export interface PlacedOrderInterface {
  items: OrderedItemInterface[];
  orderId?: string;
  customerName: string;
  contactNumber: number;
  loyaltyCardNumber: number;
  address: string;
  town: string;
  postcode: string;
  paymentType: PaymentEnum;
  status: PaymentEnum;
  total: number;
}
