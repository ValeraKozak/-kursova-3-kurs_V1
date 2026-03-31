import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const authRepository = {
  findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  },

  createUser(data) {
    return prisma.user.create({ data });
  }
};
