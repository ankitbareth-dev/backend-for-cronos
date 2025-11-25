import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";

export const updateUser = async (
  userId: string,
  name?: string,
  email?: string,
  oldPassword?: string,
  newPassword?: string
) => {
  if (email) {
    const existing = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id: userId },
      },
    });

    if (existing) {
      const error: any = new Error("Email already taken");
      error.status = 400;
      throw error;
    }
  }

  if (oldPassword && newPassword) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      const error: any = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      const error: any = new Error("Old password incorrect");
      error.status = 400;
      throw error;
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    return prisma.user.update({
      where: { id: userId },
      data: { name, email, password: hashed },
      select: { id: true, name: true, email: true },
    });
  }

  return prisma.user.update({
    where: { id: userId },
    data: { name, email },
    select: { id: true, name: true, email: true },
  });
};
