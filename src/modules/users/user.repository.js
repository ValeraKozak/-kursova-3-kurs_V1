import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const userRepository = {
  findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: { id: 'desc' }
    });
  }
};
