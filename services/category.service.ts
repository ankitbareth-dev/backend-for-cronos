import { prisma } from "../utils/prisma";
import { AppError } from "../utils/AppError";

export const categoryService = {
  async getAll(userId: string, matrixId: string) {
    const matrix = await prisma.timeMatrix.findFirst({
      where: { id: matrixId, userId },
      select: { id: true },
    });

    if (!matrix) {
      throw new AppError("Matrix not found", 404);
    }

    return prisma.category.findMany({
      where: { matrixId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        color: true,
        createdAt: true,
      },
    });
  },

  async create(
    userId: string,
    matrixId: string,
    data: { name: string; color: string }
  ) {
    const matrix = await prisma.timeMatrix.findFirst({
      where: { id: matrixId, userId },
      select: { id: true },
    });

    if (!matrix) {
      throw new AppError("Matrix not found", 404);
    }

    return prisma.category.create({
      data: {
        name: data.name,
        color: data.color,
        matrixId,
      },
      select: {
        id: true,
        name: true,
        color: true,
      },
    });
  },

  async update(
    userId: string,
    matrixId: string,
    categoryId: string,
    data: { name: string; color: string }
  ) {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        matrixId,
        matrix: { userId },
      },
      select: { id: true },
    });

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return prisma.category.update({
      where: { id: categoryId },
      data,
      select: {
        id: true,
        name: true,
        color: true,
      },
    });
  },

  async delete(userId: string, matrixId: string, categoryId: string) {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        matrixId,
        matrix: { userId },
      },
      select: { id: true },
    });

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    await prisma.category.delete({
      where: { id: categoryId },
    });
  },
};
