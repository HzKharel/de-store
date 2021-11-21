import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaDefinition } from '../../Schema/SchemaDefinition';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { MailInterface } from '../../Interfaces/MailInterface';

@Injectable()
export class MailService {
  constructor(
    @InjectModel(SchemaDefinition.MailSchema)
    private readonly mailDB: Model<MailInterface>,
  ) {}

  async newMail(mail: MailInterface) {
    mail.mailId = uuid();
    await this.mailDB.create(mail);
    return 'OK';
  }

  async deleteMail(mailId: string) {
    await this.mailDB.findOneAndDelete({ mailId: mailId });
    return 'OK';
  }

  async markRead(mailId: string) {
    await this.mailDB.findOneAndUpdate(
      { mailId: mailId },
      { read: true },
      { upsert: true },
    );
  }

  async getMail(mailType: 'FINANCE' | 'STOCK') {
    return this.mailDB.find({ mailType: mailType });
  }
}
