import { transactionService } from '../transactions/transaction.service.js';

export const reportService = {
  async getBalance(userId) {
    return transactionService.getBalance(userId);
  },

  async getStats(userId, startDate, endDate) {
    return transactionService.getStats(userId, startDate, endDate);
  }
};
