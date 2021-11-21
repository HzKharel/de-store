export interface StorePerformanceReportInterface {
  ordersFulfilled: number;
  ordersCancelled: number;
  financeApplications: number;
  financeApprovalRate: number;
  ProductsSold: number;
  newCustomersGained: number;
  grossProfit: number;
  netProfit: number;
  quarterProfitChange: number;
  averageCustomerRating: number;
  refundsProcessed: number;
  salesPerMonth: { month: string; sale: number }[];
}
