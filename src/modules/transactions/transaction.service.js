import { transactionRepository } from './transaction.repository.js';
import { ApiError } from '../../utils/apiError.js';

export const transactionService = {
  async create(userId, data) {
    return transactionRepository.create({
      ...data,
      date: new Date(data.date),
      userId
    });
  },

  async getAll(userId, query) {
    return transactionRepository.findAllByUser(userId, query);
  },

  async update(userId, id, data) {
    const transaction = await transactionRepository.findById(id);
    if (!transaction || transaction.userId !== userId) {
      throw new ApiError(404, 'Transaction not found');
    }

    return transactionRepository.update(id, {
      ...data,
      ...(data.date ? { date: new Date(data.date) } : {})
    });
  },

  async remove(userId, id) {
    const transaction = await transactionRepository.findById(id);
    if (!transaction || transaction.userId !== userId) {
      throw new ApiError(404, 'Transaction not found');
    }

    await transactionRepository.delete(id);
    return { message: 'Transaction deleted successfully' };
  },

  async getBalance(userId) {
    return transactionRepository.calculateBalance(userId);
  },

  async getStats(userId, startDate, endDate) {
    if (!startDate || !endDate) {
      throw new ApiError(400, 'startDate and endDate are required');
    }

    return transactionRepository.getStatsByPeriod(userId, startDate, endDate);
  }
};
