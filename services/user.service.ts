import { prisma } from "../utils/prisma";

export const updateUser = async (userId: string, name?: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { name },
    select: { id: true, name: true },
  });
};
