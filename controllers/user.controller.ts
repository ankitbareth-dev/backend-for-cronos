import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { catchAsync } from "../utils/catchAsync";

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { name } = req.body;

  const updatedUser = await userService.updateUser(userId, name);

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: updatedUser,
  });
});
