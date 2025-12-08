import { prisma } from "../utils/prisma";

export const categoryService = {
  async create(userId: string, matrixId: string, data: any) {
    // Verify matrix belongs to the user
    const matrix = await prisma.timeMatrix.findFirst({
      where: { id: matrixId, userId },
    });

    if (!matrix) throw new Error("Matrix not found or not owned by user");

    return prisma.category.create({
      data: {
        name: data.name,
        color: data.color,
        matrixId,
      },
    });
  },

  async update(
    userId: string,
    matrixId: string,
    categoryId: string,
    data: any
  ) {
    // Verify category exists and belongs to the user's matrix
    const category = await prisma.category.findFirst({
      where: { id: categoryId, matrixId },
    });

    // Verify matrix ownership
    const matrix = await prisma.timeMatrix.findFirst({
      where: { id: matrixId, userId },
    });

    if (!category || !matrix)
      throw new Error("Category not found in this matrix or not owned by user");

    return prisma.category.update({
      where: { id: categoryId },
      data,
    });
  },

  async delete(userId: string, matrixId: string, categoryId: string) {
    // Verify category exists and belongs to the user's matrix
    const category = await prisma.category.findFirst({
      where: { id: categoryId, matrixId },
    });

    // Verify matrix ownership
    const matrix = await prisma.timeMatrix.findFirst({
      where: { id: matrixId, userId },
    });

    if (!category || !matrix)
      throw new Error("Category not found in this matrix or not owned by user");

    return prisma.category.delete({
      where: { id: categoryId },
    });
  },
};
