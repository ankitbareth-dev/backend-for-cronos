import { Router } from "express";
import { protectedRoute } from "../middlewares/protectedRoute";
import { validate } from "../middlewares/validate";
import { CellController } from "../controllers/cell.controller";
import { getCellsSchema, saveCellsSchema } from "../validations/cell.schema";

const router = Router();

router.use(protectedRoute);

router.get("/:matrixId", validate(getCellsSchema), CellController.getCells);

router.put("/:matrixId", validate(saveCellsSchema), CellController.saveCells);

export default router;
