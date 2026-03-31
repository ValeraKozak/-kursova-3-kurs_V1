import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const transactionRepository = {
  create(data) {
    return prisma.transaction.create({
      data,
      include: { category: true }
    });
  },

  findById(id) {
    return prisma.transaction.findUnique({
      where: { id },
      include: { category: true }
    });
  },

  update(id, data) {
    return prisma.transaction.update({
      where: { id },
      data,
      include: { category: true }
    });
  },

  delete(id) {
    return prisma.transaction.delete({ where: { id } });
  },

  findAllByUser(userId, filters) {
    const where = { userId };

    if (filters.type) where.type = filters.type;
    if (filters.startDate || filters.endDate) {
      where.date = {};
      if (filters.startDate) where.date.gte = new Date(filters.startDate);
      if (filters.endDate) where.date.lte = new Date(filters.endDate);
    }

    return prisma.transaction.findMany({
      where,
      include: { category: true },
      orderBy: { date: 'desc' }
    });
  },

  async calculateBalance(userId) {
    const items = await prisma.transaction.findMany({ where: { userId } });

    let income = 0;
    let expense = 0;

    for (const item of items) {
      const amount = Number(item.amount);
      if (item.type === 'INCOME') income += amount;
      else expense += amount;
    }

    return {
      income,
      expense,
      balance: income - expense
    };
  },

  async getStatsByPeriod(userId, startDate, endDate) {
    const items = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      }
    });

    let income = 0;
    let expense = 0;

    for (const item of items) {
      const amount = Number(item.amount);
      if (item.type === 'INCOME') income += amount;
      else expense += amount;
    }

    return {
      startDate,
      endDate,
      income,
      expense,
      balance: income - expense,
      operationsCount: items.length
    };
  }
};
