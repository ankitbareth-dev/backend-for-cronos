import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { cellService } from "../services/cell.service";

export const CellController = {
  getCells: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId } = req.params;

    const cells = await cellService.getCells(userId, matrixId);

    res.status(200).json({
      success: true,
      data: cells,
    });
  }),

  saveCells: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId } = req.params;
    const { cells } = req.body;

    await cellService.saveCells(userId, matrixId, cells);

    res.status(200).json({
      success: true,
      message: "Cells updated successfully",
    });
  }),
};
