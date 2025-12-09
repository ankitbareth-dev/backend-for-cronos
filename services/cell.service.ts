import { prisma } from "../utils/prisma";

export const cellService = {
  // GET cells for a matrix for the logged-in user
  async getCells(matrixId: string, userId: string) {
    // Find matrix and its matrixData
    const matrixData = await prisma.matrixData.findFirst({
      where: {
        matrixId,
        matrix: { userId },
      },
      select: {
        id: true,
        cells: {
          select: {
            id: true,
            index: true,
            colorHex: true,
          },
        },
      },
    });

    if (!matrixData) throw new Error("Matrix not found or not owned by user");

    return matrixData.cells;
  },

  // Save/update cells for a matrix
  async saveCells(matrixId: string, userId: string, cells: any[]) {
    return prisma.$transaction(async (tx) => {
      // 1. Find the matrixData for this matrix
      const matrixData = await tx.matrixData.findFirst({
        where: {
          matrixId,
          matrix: { userId },
        },
      });

      if (!matrixData) throw new Error("Matrix not found or not owned by user");

      const matrixDataId = matrixData.id;

      // 2. Delete old cells for this user + matrixData
      await tx.matrixCell.deleteMany({
        where: { matrixDataId, userId },
      });

      // 3. Insert new cells
      if (cells.length > 0) {
        await tx.matrixCell.createMany({
          data: cells.map((c) => ({
            index: c.index,
            colorHex: c.colorHex,
            matrixDataId,
            userId,
          })),
        });
      }

      return true;
    });
  },
};
