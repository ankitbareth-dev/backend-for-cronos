import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { matrixDataService } from "../services/matrixData.service";

export const MatrixDataController = {
  getByMatrixId: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId } = req.params;

    const matrixData = await matrixDataService.getByMatrixId(userId, matrixId);

    res.status(200).json({
      success: true,
      data: matrixData,
    });
  }),
};
