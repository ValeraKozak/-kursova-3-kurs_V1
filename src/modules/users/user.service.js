import { userRepository } from './user.repository.js';

export const userService = {
  async getAll() {
    return userRepository.findAll();
  }
};
