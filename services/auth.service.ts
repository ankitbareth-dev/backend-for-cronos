import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "../utils/prisma";
import { AppError } from "../utils/AppError";
import { config } from "../config/env";

const googleClient = new OAuth2Client(config.auth.google.clientId);

export const googleAuthService = async (idToken: string) => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: config.auth.google.clientId,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new AppError("Invalid Google token", 401);
  }

  const { sub: googleId, email, name, picture } = payload;

  if (!googleId || !email) {
    throw new AppError("Invalid Google account data", 400);
  }

  const user = await prisma.user.upsert({
    where: {
      email,
    },
    update: {
      name,
      avatarUrl: picture,
      googleId,
    },
    create: {
      email,
      googleId,
      name,
      avatarUrl: picture,
    },
  });

  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
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
    token,
  };
};
