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

router.get("/", protectedRoute, MatrixController.getUserMatrix);

router.get("/:matrixId/full", protectedRoute, MatrixController.getFullMatrix);

router.post(
  "/create",
  protectedRoute,
  validate(createMatrixSchema),
  MatrixController.createMatrix
);

router.put(
  "/edit",
  protectedRoute,
  validate(editMatrixSchema),
  MatrixController.editMatrix
);

router.delete(
  "/delete",
  protectedRoute,
  validate(deleteMatrixSchema),
  MatrixController.deleteMatrix
);

export default router;
