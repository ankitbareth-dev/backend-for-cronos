import { Router } from "express";
import { protectedRoute } from "../middlewares/protectedRoute";
import { validate } from "../middlewares/validate";
import { CellController } from "../controllers/cell.controller";
import { getCellsSchema, saveCellsSchema } from "../validations/cell.schema";

const router = Router();

router.get(
  "/:matrixId",
  protectedRoute,
  validate(getCellsSchema),
  CellController.getCells
);

router.post(
  "/save",
  protectedRoute,
  validate(saveCellsSchema),
  CellController.saveCells
);

export default router;
