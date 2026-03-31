import { userService } from './user.service.js';

export const userController = {
  async getAll(req, res, next) {
    try {
      const users = await userService.getAll();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  }
};
