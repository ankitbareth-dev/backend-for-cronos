import { Request, Response } from "express";
import { matrixDataService } from "../services/matrixData.service";

export const MatrixDataController = {
  getMatrixData: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId } = req.params;

    try {
      const matrixData = await matrixDataService.getByMatrixId(
        userId,
        matrixId
      );

      if (!matrixData) {
        return res.status(404).json({
          success: false,
          message: "Matrix data not found for this user",
        });
      }

      res.status(200).json({ success: true, data: matrixData });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};
