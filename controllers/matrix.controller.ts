import { Request, Response } from "express";
import { matrixService } from "../services/matrix.service";

export const MatrixController = {
  getUserMatrix: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const matrices = await matrixService.getAll(userId);

    res.status(200).json({ success: true, data: matrices });
  },

  getFullMatrix: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const matrixId = req.params.matrixId;

    const matrix = await matrixService.getFull(userId, matrixId);

    res.status(200).json({ success: true, data: matrix });
  },

  createMatrix: async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const matrix = await matrixService.create(userId, req.body);

    res.status(201).json({ success: true, data: matrix });
  },

  editMatrix: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId, name } = req.body;

    const updated = await matrixService.update(userId, matrixId, name);

    res.status(200).json({ success: true, data: updated });
  },

  deleteMatrix: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId } = req.body;

    await matrixService.delete(userId, matrixId);

    res.status(200).json({ success: true, message: "Matrix deleted" });
  },
};
