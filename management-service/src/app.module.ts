import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportingService } from './services/reporting/reporting.service';
import { ReportingController } from './controllers/reporting/reporting.controller';
import { SchemaDefinition } from './Schema/SchemaDefinition';
import { OrderSchema } from './Schema/OrderSchema';
import { MailService } from './services/mail/mail.service';
import { MailController } from './controllers/mail/mail.controller';
import { MailSchema } from './Schema/MailSchema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/products', {
      connectionName: 'products',
    }),
    MongooseModule.forRoot('mongodb://localhost/mail', {
      connectionName: 'mail',
    }),
    MongooseModule.forFeature(
      [{ name: SchemaDefinition.OrderSchema, schema: OrderSchema }],
      'products',
    ),
    MongooseModule.forFeature(
      [{ name: SchemaDefinition.MailSchema, schema: MailSchema }],
      'mail',
    ),
  ],
  controllers: [ReportingController, MailController],
  providers: [ReportingService, MailService],
})
export class AppModule {}
