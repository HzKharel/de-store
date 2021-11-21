import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MailService } from '../../services/mail/mail.service';
import { InternalServiceGuard } from '../../Guards/InternalServiceGuard';
import { MailInterface } from '../../Interfaces/MailInterface';
import { ManagerGuard } from '../../Guards/ManagerGuard';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  
  @Get('/info')
  getServerStatus() {
    return 'This is the Management service - mail controller';
  }


  @Post('/sendNewMail')
  @UseGuards(InternalServiceGuard)
  sendNewMail(@Body() mail: MailInterface) {
    console.log('called')
    return this.mailService.newMail(mail);
  }

  @Put('/markMailRead')
  @UseGuards(ManagerGuard)
  markMailRead(@Query('mailId') mailId: string) {
    return this.mailService.markRead(mailId);
  }

  @Delete('/delete')
  @UseGuards(ManagerGuard)
  deleteMail(@Query('mailId') mailId: string) {
    return this.mailService.deleteMail(mailId);
  }

  @Get('getMail')
  @UseGuards(ManagerGuard)
  getMail(@Query('mailType') mailType: 'FINANCE' | 'STOCK') {
    return this.mailService.getMail(mailType);
  }
}
