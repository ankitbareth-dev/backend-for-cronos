import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as userService from "../services/user.service";

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { name } = req.body;
  const file = req.file;

  const updatedUser = await userService.updateUserProfile({
    userId,
    name,
    file,
  });

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: updatedUser,
  });
});
