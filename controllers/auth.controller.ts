import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { googleAuthService } from "../services/auth.service";

export const googleAuth = catchAsync(async (req: Request, res: Response) => {
  const { idToken } = req.body;

  const { user, token } = await googleAuthService(idToken);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatarUrl,
    },
  });
});

export const checkAuth = (req: Request & { user?: any }, res: Response) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
