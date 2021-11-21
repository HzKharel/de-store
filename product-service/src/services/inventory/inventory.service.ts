import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ProductInterface } from '../../Interfaces/ProductInterface';
import { SchemaDefinition } from '../../Schema/SchemaDefinition';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { UpdateProductStockInterface } from '../../Interfaces/UpdateProductStockInterface';
import { MailInterface } from '../../Interfaces/MailInterface';
import axios from 'axios';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(SchemaDefinition.ProductSchema)
    private readonly productListDB: Model<ProductInterface>,
  ) {}

  async createNewProduct(newProduct: ProductInterface) {
    const id = uuid();
    await this.productListDB.create({ ...newProduct, productId: id });

    return {
      message: 'Product Created successfully',
      productId: newProduct.productId,
    };
  }

  async getAllProducts() {
    const products: ProductInterface[] = await this.productListDB.find();
    return products;
  }

  async deleteProduct(productId: string) {
    const exists = await this.productListDB.findOne({
      productId: productId,
    });

    if (exists) {
      await this.productListDB.findOneAndDelete({ productId: productId });
      return 'OK';
    } else {
      throw new HttpException(
        'Product with specified id does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async OrderProductStock(productStock: UpdateProductStockInterface) {
    const product: ProductInterface = await this.productListDB.findOne({
      productId: productStock.productId,
    });

    // integrate warehouse API to make the order
    // this implementation assumes same day delivery of ordered stock

    if (product) {
      await this.productListDB.findOneAndUpdate(
        { productId: productStock.productId },
        {
          quantityAvailable:
            product.quantityAvailable + productStock.stockOrdered,
        },
      );
      return 'OK';
    } else {
      throw new HttpException(
        'Product with specified id does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProductDetails(products: string[]) {
    const productData: {
      productId: string;
      productName: string;
      productPrice: number;
    }[] = [];
    for (const productId of products) {
      const tempProduct: ProductInterface = await this.productListDB.findOne({
        productId: productId,
      });
      if (tempProduct) {
        productData.push({
          productId: productId,
          productName: tempProduct.name,
          productPrice: tempProduct.price,
        });
      }
    }

    return productData;
  }

  async reduceItemQuantity(
    products: { productId: string; quantity: number }[],
  ) {
    for (const product of products) {
      const productInDB: ProductInterface = await this.productListDB.findOne({
        productId: product.productId,
      });
      const newQuantity = productInDB.quantityAvailable - product.quantity;

      if (newQuantity < 5) {
        const mail: MailInterface = {
          mailType: 'STOCK',
          message: `${productInDB.name} is low on stock. ${
            newQuantity > 0 ? newQuantity : 0
          } units available.`,
          read: false,
          targetId: productInDB.productId,
          title: `${productInDB.name} Low stock warning! `,
        };
        await axios.post('http://localhost:3004/mail/sendNewMail', mail, {
          headers: { token: 'product-service' },
        });
      }
      await this.productListDB.findOneAndUpdate(
        { productId: product.productId },
        { quantityAvailable: newQuantity > 0 ? newQuantity : 0 },
        { upsert: true },
      );
      // order products of out of stock
      if (newQuantity < 1) {
        await this.OrderProductStock({
          stockOrdered: 20,
          productId: product.productId,
        });
      }
    }
    return 'OK';
  }

  async updateProduct(product: ProductInterface) {
    await this.productListDB.findOneAndUpdate(
      { productId: product.productId },
      {
        name: product.name,
        price: product.price,
        image: product.image,
        promotion: product.promotion,
        quantityAvailable: product.quantityAvailable,
        description: product.description,
      },
      { upsert: true },
    );

    return 'OK';
  }
}
