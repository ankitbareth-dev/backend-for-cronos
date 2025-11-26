import { prisma } from "../utils/prisma";

export const cellService = {
  getCells(matrixId: string, userId: string) {
    return prisma.matrixCell.findMany({
      where: {
        matrixId,
        matrix: { userId },
      },
      include: {
        category: true,
      },
    });
  },

  async saveCells(matrixId: string, userId: string, cells: any[]) {
    return prisma.$transaction(async (tx) => {
      const matrix = await tx.timeMatrix.findFirst({
        where: { id: matrixId, userId },
      });

      if (!matrix) throw new Error("Matrix not found");

      await tx.matrixCell.deleteMany({
        where: { matrixId },
      });

      if (cells.length > 0) {
        await tx.matrixCell.createMany({
          data: cells.map((c) => ({
            ...c,
            matrixId,
          })),
        });
      }

      return true;
    });
  },
};
