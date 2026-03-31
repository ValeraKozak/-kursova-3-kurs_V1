import { categoryService } from './category.service.js';

export const categoryController = {
  async create(req, res, next) {
    try {
      const category = await categoryService.create(req.user.id, req.validated.body);
      res.status(201).json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const categories = await categoryService.getAll(req.user.id);
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  }
};
