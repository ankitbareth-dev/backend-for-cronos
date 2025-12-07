import { prisma } from "../utils/prisma";

export const matrixService = {
  getAll(userId: string) {
    return prisma.timeMatrix.findMany({
      where: { userId },
      include: { cells: true },
    });
  },

  create(userId: string, data: any) {
    return prisma.timeMatrix.create({
      data: {
        name: data.name,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
        startTime: data.startTime,
        endTime: data.endTime,
        interval: data.interval,
        userId,
      },
    });
  },

  update(userId: string, matrixId: string, name: string) {
    return prisma.timeMatrix.update({
      where: { id: matrixId, userId },
      data: { name },
    });
  },

  delete(userId: string, matrixId: string) {
    return prisma.timeMatrix.delete({
      where: { id: matrixId, userId },
    });
  },
};
