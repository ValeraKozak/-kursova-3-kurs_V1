import bcrypt from 'bcryptjs';
import { authRepository } from './auth.repository.js';
import { ApiError } from '../../utils/apiError.js';
import { signToken } from '../../utils/jwt.js';

export const authService = {
  async register(data) {
    const existingUser = await authRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ApiError(409, 'User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await authRepository.createUser({
      name: data.name,
      email: data.email,
      passwordHash,
      role: 'USER'
    });

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  },

  async login(data) {
    const user = await authRepository.findByEmail(data.email);
    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  }
};