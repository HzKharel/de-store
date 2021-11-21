import { Injectable } from '@nestjs/common';
import { StorePerformanceReportInterface } from '../../Interfaces/StorePerformanceReportInterface';
import { Model } from 'mongoose';
import { PlacedOrderInterface } from '../../Interfaces/PlacedOrderInterface';
import { SchemaDefinition } from '../../Schema/SchemaDefinition';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReportingService {
  constructor(
    @InjectModel(SchemaDefinition.OrderSchema)
    private readonly ordersDB: Model<PlacedOrderInterface>,
  ) {}

  getHello() {
    return 'Hello Management';
  }

  getStorePerformance() {
    const performanceStats: StorePerformanceReportInterface = {
      ProductsSold: Math.floor(Math.random() * 1000) + 500,
      averageCustomerRating: Math.floor(Math.random() * 5) + 1,
      financeApplications: Math.floor(Math.random() * 500) + 200,
      financeApprovalRate: Math.floor(Math.random() * 100) + 1,
      grossProfit: Math.floor(Math.random() * 100000) + 70000,
      netProfit: Math.floor(Math.random() * 70000) + 25000,
      newCustomersGained: Math.floor(Math.random() * 1000) + 1,
      ordersCancelled: Math.floor(Math.random() * 100) + 1,
      ordersFulfilled: Math.floor(Math.random() * 1000) + 1,
      quarterProfitChange: Math.floor(Math.random() * 40000) + 10000,
      refundsProcessed: Math.floor(Math.random() * 100) + 1,
      salesPerMonth: [
        { month: 'January', sale: Math.floor(Math.random() * 100000) + 25000 },
        { month: 'February', sale: Math.floor(Math.random() * 100000) + 25000 },
        { month: 'March', sale: Math.floor(Math.random() * 100000) + 25000 },
        { month: 'April', sale: Math.floor(Math.random() * 100000) + 25000 },
        { month: 'May', sale: Math.floor(Math.random() * 70000) + 25000 },
        { month: 'June', sale: Math.floor(Math.random() * 100000) + 25000 },
        { month: 'July', sale: Math.floor(Math.random() * 70000) + 25000 },
        { month: 'August', sale: Math.floor(Math.random() * 70000) + 25000 },
        { month: 'September', sale: Math.floor(Math.random() * 100000) + 25000 },
        { month: 'October', sale: Math.floor(Math.random() * 70000) + 25000 },
        { month: 'November', sale: Math.floor(Math.random() * 100000) + 25000 },
        { month: 'December', sale: Math.floor(Math.random() * 100000) + 25000 },
      ],
    };

    return performanceStats;
  }

  getAllOrders() {
    return this.ordersDB.find();
  }
}
