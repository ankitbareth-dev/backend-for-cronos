import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as userService from "../services/user.service";

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const updatedUser = await userService.updateUserProfile({
    userId,
    name: req.body.name,
    file: req.file,
  });

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});
