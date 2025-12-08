import { prisma } from "../utils/prisma";

export const cellService = {
  async saveCells(matrixId: string, userId: string, cells: any[]) {
    return prisma.$transaction(async (tx) => {
      // 1. Verify matrix belongs to user
      const matrix = await tx.timeMatrix.findFirst({
        where: { id: matrixId, userId },
      });

      if (!matrix) throw new Error("Matrix not found or not owned by user");

      // 2. Clear old cells
      await tx.matrixCell.deleteMany({
        where: { matrixId },
      });

      // 3. Insert new cells
      if (cells.length > 0) {
        await tx.matrixCell.createMany({
          data: cells.map((c) => ({
            index: c.index,
            colorHex: c.colorHex,
            matrixId,
          })),
        });
      }

      return true;
    });
  },
};
