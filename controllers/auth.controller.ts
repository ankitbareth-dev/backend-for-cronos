import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";

export const signup = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await authService.registerUser(name, email, password);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    // Use AppError for known operational errors
    if (error.message.includes("exists")) {
      throw new AppError(error.message, 400);
    }
    // Otherwise, let it be caught by global error handler
    throw error;
  }
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await authService.loginUser(email, password);

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error: any) {
    // Known auth error
    throw new AppError(error.message || "Invalid credentials", 400);
  }
});
