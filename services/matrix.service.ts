import { prisma } from "../utils/prisma";

export const matrixService = {
  getAll(userId: string) {
    return prisma.timeMatrix.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
  },

  create(userId: string, data: any) {
    return prisma.timeMatrix.create({
      data: {
        name: data.name,
        userId,

        matrixData: {
          create: {
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            startTime: data.startTime,
            endTime: data.endTime,
            interval: data.interval,
          },
        },
      },
      include: {
        matrixData: true,
      },
    });
  },

  update(userId: string, matrixId: string, name: string) {
    return prisma.timeMatrix.updateMany({
      where: { id: matrixId, userId },
      data: { name },
    });
  },

  async delete(userId: string, matrixId: string) {
    return prisma.$transaction(async (tx) => {
      const matrix = await tx.timeMatrix.findFirst({
        where: { id: matrixId, userId },
      });

      if (!matrix) throw new Error("Matrix not found");

      await tx.category.deleteMany({
        where: { matrixId },
      });

      await tx.matrixData.deleteMany({
        where: { matrixId },
      });

      await tx.timeMatrix.delete({
        where: { id: matrixId },
      });
    });
  },
};
