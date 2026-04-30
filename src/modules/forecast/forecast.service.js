import { forecastRepository } from './forecast.repository.js';
import {
  groupTransactionsByMonth,
  getForecastByModel
} from './forecast.utils.js';

export const forecastService = {
  async getMonthlyForecast(userId, model = 'moving_average') {
    const transactions = await forecastRepository.getUserTransactions(userId);
    const monthlyData = groupTransactionsByMonth(transactions);

    const incomeSeries = monthlyData.map((item) => item.income);
    const expenseSeries = monthlyData.map((item) => item.expense);

    const incomeForecast = getForecastByModel(incomeSeries, model);
    const expenseForecast = getForecastByModel(expenseSeries, model);
    const balanceForecast = incomeForecast - expenseForecast;

    return {
      model,
      basedOnMonths: monthlyData.length,
      nextPeriod: 'next_month',
      history: monthlyData,
      forecast: {
        income: Number(incomeForecast.toFixed(2)),
        expense: Number(expenseForecast.toFixed(2)),
        balance: Number(balanceForecast.toFixed(2))
      }
    };
  }
};