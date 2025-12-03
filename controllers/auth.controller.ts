import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { catchAsync } from "../utils/catchAsync";

export const signup = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    await authService.registerUser(name, email, password);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error: any) {
    if (error?.message?.includes("exists")) {
      error.status = 400;
    }

    throw error;
  }
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await authService.loginUser(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    error.status = 400;
    throw error;
  }
});

export const logout = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
