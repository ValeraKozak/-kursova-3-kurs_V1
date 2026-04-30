import { forecastService } from './forecast.service.js';

export const forecastController = {
  async getMonthlyForecast(req, res, next) {
    try {
      const model = req.query.model || 'moving_average';
      const data = await forecastService.getMonthlyForecast(req.user.id, model);

      res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  }
};