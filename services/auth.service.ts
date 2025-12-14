import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "../utils/prisma";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuthService = async (idToken: string) => {
  // 1. Verify Google ID token
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    const error: any = new Error("Invalid Google token");
    error.status = 401;
    throw error;
  }

  const { sub: googleId, email, name, picture } = payload;

  if (!email) {
    const error: any = new Error("Google account has no email");
    error.status = 400;
    throw error;
  }

  // 2. Single source of truth = email
  let user = await prisma.user.findUnique({
    where: { email },
  });

  // 3. Create user if not exists
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        avatarUrl: picture,
        googleId,
      },
    });
  }

  // 4. Link Google account if missing (edge case)
  if (!user.googleId) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: { googleId },
    });
  }

  // 5. Issue JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
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
