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

router.use(protectedRoute);

router.get(
  "/:matrixId",
  validate(getCategoriesSchema),
  CategoryController.getCategories
);

router.post(
  "/:matrixId",
  validate(createCategorySchema),
  CategoryController.createCategory
);

router.put(
  "/:matrixId/:categoryId",
  validate(editCategorySchema),
  CategoryController.editCategory
);

router.delete(
  "/:matrixId/:categoryId",
  validate(deleteCategorySchema),
  CategoryController.deleteCategory
);

export default router;
