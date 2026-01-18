import { prisma } from "../utils/prisma";
import { AppError } from "../utils/AppError";

export const matrixService = {
  getAll(userId: string) {
    return prisma.timeMatrix.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
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
            interval: parseInt(data.interval, 10),
          },
        },
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        matrixData: true,
      },
    });
  },

  async update(userId: string, matrixId: string, name: string) {
    const matrix = await prisma.timeMatrix.findFirst({
      where: { id: matrixId, userId },
      select: { id: true },
    });

    if (!matrix) {
      throw new AppError("Matrix not found", 404);
    }

    return prisma.timeMatrix.update({
      where: { id: matrixId },
      data: { name },
      select: {
        id: true,
        name: true,
      },
    });
  },

  async delete(userId: string, matrixId: string) {
    return prisma.$transaction(async (tx) => {
      const matrix = await tx.timeMatrix.findFirst({
        where: { id: matrixId, userId },
        select: { id: true },
      });

      if (!matrix) {
        throw new AppError("Matrix not found", 404);
      }

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
