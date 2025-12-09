import { prisma } from "../utils/prisma";

export const categoryService = {
  async getAll(userId: string, matrixId: string) {
    // Ensure matrix belongs to user
    const matrix = await prisma.timeMatrix.findFirst({
      where: { id: matrixId, userId },
    });
    if (!matrix) throw new Error("Matrix not found or not owned by user");

    return prisma.category.findMany({
      where: { matrixId },
      orderBy: { createdAt: "asc" },
    });
  },

  async create(
    userId: string,
    matrixId: string,
    data: { name: string; color: string }
  ) {
    const matrix = await prisma.timeMatrix.findFirst({
      where: { id: matrixId, userId },
    });
    if (!matrix) throw new Error("Matrix not found or not owned by user");

    return prisma.category.create({
      data: { name: data.name, color: data.color, matrixId },
    });
  },

  async update(
    userId: string,
    matrixId: string,
    categoryId: string,
    data: { name: string; color: string }
  ) {
    const matrix = await prisma.timeMatrix.findFirst({
      where: { id: matrixId, userId },
    });
    if (!matrix) throw new Error("Matrix not found or not owned by user");

    const category = await prisma.category.findFirst({
      where: { id: categoryId, matrixId },
    });
    if (!category) throw new Error("Category not found in this matrix");

    return prisma.category.update({
      where: { id: categoryId },
      data,
    });
  },

  async delete(userId: string, matrixId: string, categoryId: string) {
    const matrix = await prisma.timeMatrix.findFirst({
      where: { id: matrixId, userId },
    });
    if (!matrix) throw new Error("Matrix not found or not owned by user");

    const category = await prisma.category.findFirst({
      where: { id: categoryId, matrixId },
    });
    if (!category) throw new Error("Category not found in this matrix");

    return prisma.category.delete({ where: { id: categoryId } });
  },
};
