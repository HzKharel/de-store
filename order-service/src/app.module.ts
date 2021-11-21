import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './services/order/order.service';
import { OrderController } from './controllers/order/order.controller';
import { SchemaDefinition } from './Schema/SchemaDefinition';
import { OrderSchema } from './Schema/OrderSchema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/orders'),
    MongooseModule.forFeature([
      { name: SchemaDefinition.OrderSchema, schema: OrderSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class AppModule {}
