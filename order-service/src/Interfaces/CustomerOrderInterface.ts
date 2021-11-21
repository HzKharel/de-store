import { CustomerOrderItemsInterface } from './CustomerOrderItemsInterface';
import { PaymentEnum } from './PaymentEnum';

export interface CustomerOrderInterface {
  items: CustomerOrderItemsInterface[];
  customerName: string;
  contactNumber: number;
  loyaltyCardNumber: number;
  address: string;
  town: string;
  postcode: string;
  paymentType: PaymentEnum;
}
