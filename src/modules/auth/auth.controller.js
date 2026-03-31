import { authService } from './auth.service.js';

export const authController = {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.validated.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const result = await authService.login(req.validated.body);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
};
