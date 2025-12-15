import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { matrixService } from "../services/matrix.service";

export const MatrixController = {
  getUserMatrices: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const matrices = await matrixService.getAll(userId);

    res.status(200).json({
      success: true,
      data: matrices,
    });
  }),

  createMatrix: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const matrix = await matrixService.create(userId, req.body);

    res.status(201).json({
      success: true,
      data: matrix,
    });
  }),

  editMatrix: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId } = req.params;
    const { name } = req.body;

    const updated = await matrixService.update(userId, matrixId, name);

    res.status(200).json({
      success: true,
      data: updated,
    });
  }),

  deleteMatrix: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId } = req.params;

    await matrixService.delete(userId, matrixId);

    res.status(200).json({
      success: true,
      message: "Matrix deleted successfully",
    });
  }),
};
