import { Module } from '@nestjs/common';
import { InventoryService } from './services/inventory/inventory.service';
import { InventoryController } from './controllers/inventory/inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaDefinition } from './Schema/SchemaDefinition';
import { ProductSchema } from './Schema/ProductSchema';
import { PriceService } from './services/price/price.service';
import { PriceController } from './controllers/price/price.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/products'),
    MongooseModule.forFeature([
      { name: SchemaDefinition.ProductSchema, schema: ProductSchema },
    ]),
  ],
  controllers: [InventoryController, PriceController],
  providers: [InventoryService, PriceService],
})
export class AppModule {}
