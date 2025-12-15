import { prisma } from "../utils/prisma";
import { AppError } from "../utils/AppError";

interface CellInput {
  index: number;
  colorHex: string | null;
}

export const cellService = {
  async getCells(userId: string, matrixId: string) {
    const matrixData = await prisma.matrixData.findFirst({
      where: {
        matrixId,
        matrix: { userId },
      },
      select: {
        cells: {
          select: {
            index: true,
            colorHex: true,
          },
          orderBy: { index: "asc" },
        },
      },
    });

    if (!matrixData) {
      throw new AppError("Matrix not found", 404);
    }

    return matrixData.cells;
  },

  async saveCells(userId: string, matrixId: string, cells: CellInput[]) {
    return prisma.$transaction(async (tx) => {
      const matrixData = await tx.matrixData.findFirst({
        where: {
          matrixId,
          matrix: { userId },
        },
        select: { id: true },
      });

      if (!matrixData) {
        throw new AppError("Matrix not found", 404);
      }

      const matrixDataId = matrixData.id;

      // Existing cells
      const existingCells = await tx.matrixCell.findMany({
        where: {
          matrixDataId,
          userId,
          index: { in: cells.map((c) => c.index) },
        },
        select: {
          id: true,
          index: true,
        },
      });

      const existingIndexes = new Set(existingCells.map((c) => c.index));

      const toCreate = cells
        .filter((c) => !existingIndexes.has(c.index))
        .map((c) => ({
          matrixDataId,
          userId,
          index: c.index,
          colorHex: c.colorHex,
        }));

      // 🔹 Bulk create
      if (toCreate.length > 0) {
        await tx.matrixCell.createMany({
          data: toCreate,
        });
      }

      // 🔹 Bulk update (one by one but minimal)
      await Promise.all(
        cells
          .filter((c) => existingIndexes.has(c.index))
          .map((c) =>
            tx.matrixCell.updateMany({
              where: {
                matrixDataId,
                userId,
                index: c.index,
              },
              data: { colorHex: c.colorHex },
            })
          )
      );
    });
  },
};
