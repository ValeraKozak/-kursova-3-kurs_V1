import { reportService } from './report.service.js';

export const reportController = {
  async getBalance(req, res, next) {
    try {
      const data = await reportService.getBalance(req.user.id);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async getStats(req, res, next) {
    try {
      const { startDate, endDate } = req.query;
      const data = await reportService.getStats(req.user.id, startDate, endDate);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
};
