import { Router } from "express";
import { protectedRoute } from "../middlewares/protectedRoute";
import { validate } from "../middlewares/validate";
import {
  createCategorySchema,
  editCategorySchema,
  deleteCategorySchema,
} from "../validations/category.schema";
import { CategoryController } from "../controllers/category.controller";

const router = Router();

router.post(
  "/create",
  protectedRoute,
  validate(createCategorySchema),
  CategoryController.createCategory
);

router.put(
  "/edit",
  protectedRoute,
  validate(editCategorySchema),
  CategoryController.editCategory
);

router.delete(
  "/delete",
  protectedRoute,
  validate(deleteCategorySchema),
  CategoryController.deleteCategory
);

export default router;
