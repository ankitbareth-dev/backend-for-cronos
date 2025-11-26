import { prisma } from "../utils/prisma";

export const categoryService = {
  getAll(userId: string) {
    return prisma.category.findMany({
      where: { userId },
      include: { cells: true },
    });
  },

  create(userId: string, data: { name: string; color: string }) {
    return prisma.category.create({
      data: {
        ...data,
        userId,
      },
    });
  },

  update(
    userId: string,
    categoryId: string,
    data: { name: string; color: string }
  ) {
    return prisma.category.updateMany({
      where: { id: categoryId, userId },
      data,
    });
  },

  delete(userId: string, categoryId: string) {
    return prisma.category.deleteMany({
      where: { id: categoryId, userId },
    });
  },
};
