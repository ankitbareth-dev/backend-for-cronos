import { Request, Response } from "express";
import { cellService } from "../services/cell.service";

export const CellController = {
  getCells: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId } = req.params;

    const cells = await cellService.getCells(matrixId, userId);

    res.status(200).json({
      success: true,
      data: cells,
    });
  },

  saveCells: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId, cells } = req.body;

    await cellService.saveCells(matrixId, userId, cells);

    res.status(200).json({
      success: true,
      message: "Cells updated",
    });
  },
};
