import { prisma } from "../utils/prisma";

export const matrixDataService = {
  async getByMatrixId(userId: string, matrixId: string) {
    const matrix = await prisma.timeMatrix.findFirst({
      where: { id: matrixId, userId },
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

    return matrix?.matrixData || null;
  },
};
