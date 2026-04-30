import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const forecastRepository = {
  async getUserTransactions(userId) {
    return prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'asc' }
    });
  }
};