import { Router } from "express";
import { protectedRoute } from "../middlewares/protectedRoute";
import { validate } from "../middlewares/validate";
import { CategoryController } from "../controllers/category.controller";
import {
  getCategoriesSchema,
  createCategorySchema,
  editCategorySchema,
  deleteCategorySchema,
} from "../validations/category.schema";

const router = Router();

// Get all categories for a matrix
router.get(
  "/:matrixId",
  protectedRoute,
  validate(getCategoriesSchema),
  CategoryController.getCategories
);

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
