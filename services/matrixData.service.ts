import { prisma } from "../utils/prisma";
import { AppError } from "../utils/AppError";

export const matrixDataService = {
  async getByMatrixId(userId: string, matrixId: string) {
    const matrix = await prisma.timeMatrix.findFirst({
      where: {
        id: matrixId,
        userId,
      },
      select: {
        matrixData: {
          select: {
            id: true,
            startDate: true,
            endDate: true,
            startTime: true,
            endTime: true,
            interval: true,
            createdAt: true,
          },
        },
      },
    });

    if (!matrix || !matrix.matrixData) {
      throw new AppError("Matrix data not found", 404);
    }

    return matrix.matrixData;
  },
};
