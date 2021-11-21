import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateProductPriceInterface } from '../../Interfaces/UpdateProductPriceInterface';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaDefinition } from '../../Schema/SchemaDefinition';
import { Model } from 'mongoose';
import { ProductInterface } from '../../Interfaces/ProductInterface';
import { UpdateProductPromotionInterface } from '../../Interfaces/UpdateProductPromotionInterface';

@Injectable()
export class PriceService {
  constructor(
    @InjectModel(SchemaDefinition.ProductSchema)
    private readonly productListDB: Model<ProductInterface>,
  ) {}

  async updateProductPrice(productData: UpdateProductPriceInterface) {
    const exists = await this.productListDB.findOne({
      productId: productData.productId,
    });
    if (exists) {
      await this.productListDB.findOneAndUpdate(
        { productId: productData.productId },
        { price: productData.newPrice },
        { upsert: true, new: true },
      );
      return 'OK';
    } else {
      throw new HttpException(
        'Product with specified id does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateProductPromotion(productData: UpdateProductPromotionInterface) {
    const exists = await this.productListDB.findOne({
      productId: productData.productId,
    });

    if (exists) {
      await this.productListDB.findOneAndUpdate(
        { productId: productData.productId },
        { promotion: productData.promotion },
        { upsert: true, new: true },
      );
      return 'OK';
    } else {
      throw new HttpException(
        'Product with specified id does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
