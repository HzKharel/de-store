import { Controller, Get } from '@nestjs/common';
import { ReportingService } from '../../services/reporting/reporting.service';

@Controller('reporting')
export class ReportingController {
  constructor(private reportingService: ReportingService) {}

  
  @Get('/info')
  getServerStatus() {
    return process.env;
  }


  @Get('storePerformance')
  getStorePerformance() {
    return this.reportingService.getStorePerformance();
  }

  @Get('/allOrders')
  getAllOrders() {
    return this.reportingService.getAllOrders();
  }
}
