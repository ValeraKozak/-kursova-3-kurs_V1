import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const categoryRepository = {
  create(data) {
    return prisma.category.create({ data });
  },

  findAllByUser(userId) {
    return prisma.category.findMany({
      where: { userId },
      orderBy: { id: 'desc' }
    });
  }
};
