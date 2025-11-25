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

    res.status(200).json({
      success: true,
      token,
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
