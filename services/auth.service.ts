import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";
import { AppError } from "../utils/AppError";
import { config } from "../config/env";

export const googleAuthService = async (token: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`
    );

    if (!response.ok) {
      throw new AppError("Invalid or expired Google token", 401);
    }

    const googleUser = await response.json();

    const { id: googleId, email, name, picture } = googleUser;

    if (!googleId || !email) {
      throw new AppError("Invalid Google account data", 400);
    }

    const user = await prisma.user.upsert({
      where: {
        email,
      },
      update: {
        googleId,
      },
      create: {
        email,
        googleId,
        name,
        avatarUrl: picture,
      },
    });

    const jwtToken = jwt.sign(
      {
        id: user.id,
      },
      config.jwt.secret,
      { expiresIn: "7d" }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
      token: jwtToken,
    };
  } catch (error) {
    console.error("Google Auth Service Error:", error);

    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Internal server error during authentication", 500);
  }
};
export const getAuthenticatedUserService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 401);
  }

  return user;
};
