import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  items: [
    {
      productName: String,
      quantity: Number,
      productPrice: Number,
    },
  ],
  customerName: String,
  contactNumber: Number,
  loyaltyCardNumber: Number,
  address: String,
  town: String,
  postcode: String,
  paymentType: String,
  status: String,
  total: Number,
});
