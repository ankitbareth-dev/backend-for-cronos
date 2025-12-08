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

  getFull(userId: string, matrixId: string) {
    return prisma.timeMatrix.findFirst({
      where: { id: matrixId, userId },
      include: {
        categories: true,
        cells: true,
      },
    });
  },

  create(userId: string, data: any) {
    return prisma.timeMatrix.create({
      data: {
        name: data.name,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        startTime: data.startTime,
        endTime: data.endTime,
        interval: data.interval,

        // safer
        user: { connect: { id: userId } },
      },
    });
  },

  update(userId: string, matrixId: string, name: string) {
    return prisma.timeMatrix.updateMany({
      where: { id: matrixId, userId },
      data: { name },
    });
  },

  delete(userId: string, matrixId: string) {
    return prisma.timeMatrix.deleteMany({
      where: { id: matrixId, userId },
    });
  },
};
