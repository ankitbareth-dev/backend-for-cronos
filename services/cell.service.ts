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

  async saveCells(matrixId: string, userId: string, cells: any[]) {
    return prisma.$transaction(async (tx) => {
      const matrixData = await tx.matrixData.findFirst({
        where: {
          matrixId,
          matrix: { userId },
        },
      });

      if (!matrixData) throw new Error("Matrix not found or not owned by user");

      const matrixDataId = matrixData.id;

      // UPSERT each cell (update if exists, else create)
      for (const c of cells) {
        await tx.matrixCell.upsert({
          where: {
            matrixDataId_index_userId: {
              matrixDataId,
              index: c.index,
              userId,
            },
          },
          update: {
            colorHex: c.colorHex, // update existing cell
          },
          create: {
            matrixDataId,
            userId,
            index: c.index,
            colorHex: c.colorHex,
          },
        });
      }

      return true;
    });
  },
};
