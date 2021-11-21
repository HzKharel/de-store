import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  promotion: String,
  category: String,
  image: String,
  description: String,
  quantityAvailable: Number,
});
