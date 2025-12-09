import { Router } from "express";
import { protectedRoute } from "../middlewares/protectedRoute";
import { validate } from "../middlewares/validate";
import { MatrixDataController } from "../controllers/matrixData.controller";
import { getMatrixDataSchema } from "../validations/matrixData.schema";

const router = Router();

router.get(
  "/:matrixId",
  protectedRoute,
  validate(getMatrixDataSchema),
  MatrixDataController.getMatrixData
);

export default router;
