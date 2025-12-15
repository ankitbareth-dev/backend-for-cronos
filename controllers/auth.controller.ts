import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { googleAuthService } from "../services/auth.service";
import { AuthRequest } from "../middlewares/protectedRoute";

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
    user,
  });
});

export const checkAuth = (req: AuthRequest, res: Response) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (_req: AuthRequest, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
