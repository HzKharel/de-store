import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { OrderService } from '../../services/order/order.service';
import { AuthGuard } from '../../Guards/AuthGuard';
import { CustomerOrderInterface } from '../../Interfaces/CustomerOrderInterface';
import { ManagerGuard } from '../../Guards/ManagerGuard';
import { FinanceDecisionInterface } from '../../Interfaces/FinanceDecisionInterface';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  
  @Get('/info')
  getServerStatus() {
    return 'This is the Order service - order controller';
  }


  @Post('newOrder')
  @UseGuards(AuthGuard)
  placeNewOrder(@Body() order: CustomerOrderInterface) {
    return this.orderService.placeOrder(order);
  }

  @Post('financeDecision')
  @UseGuards(ManagerGuard)
  financeDecision(@Body() financeData: FinanceDecisionInterface) {
    return this.orderService.financeDecision(financeData);
  }

  @Get('/allOrders')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }
}
