import { transactionService } from './transaction.service.js';

export const transactionController = {
  async create(req, res, next) {
    try {
      const transaction = await transactionService.create(req.user.id, req.validated.body);
      res.status(201).json({ success: true, data: transaction });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const data = await transactionService.getAll(req.user.id, req.query);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const data = await transactionService.update(req.user.id, req.validated.params.id, req.validated.body);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const data = await transactionService.remove(req.user.id, Number(req.params.id));
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
};
