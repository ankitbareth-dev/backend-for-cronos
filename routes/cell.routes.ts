import { Router } from "express";
import { protectedRoute } from "../middlewares/protectedRoute";
import { validate } from "../middlewares/validate";
import { CellController } from "../controllers/cell.controller";
import { saveCellsSchema } from "../validations/cell.schema";

const router = Router();

// GET cells for a matrix
router.get("/", protectedRoute, CellController.getCells);

// POST save/update cells
router.post(
  "/save",
  protectedRoute,
  validate(saveCellsSchema),
  CellController.saveCells
);

export default router;
