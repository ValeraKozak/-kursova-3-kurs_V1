import { categoryRepository } from './category.repository.js';

export const categoryService = {
  async create(userId, data) {
    return categoryRepository.create({
      ...data,
      userId
    });
  },

  async getAll(userId) {
    return categoryRepository.findAllByUser(userId);
  }
};
