import { Router } from "express";
import { MatrixController } from "../controllers/matrix.controller";
import { protectedRoute } from "../middlewares/protectedRoute";
import { validate } from "../middlewares/validate";
import {
  createMatrixSchema,
  editMatrixSchema,
  deleteMatrixSchema,
} from "../validations/matrix.schema";

const router = Router();

router.use(protectedRoute);

router.get("/", MatrixController.getUserMatrices);

router.post("/", validate(createMatrixSchema), MatrixController.createMatrix);

router.put(
  "/:matrixId",
  validate(editMatrixSchema),
  MatrixController.editMatrix
);

router.delete(
  "/:matrixId",
  validate(deleteMatrixSchema),
  MatrixController.deleteMatrix
);

export default router;
