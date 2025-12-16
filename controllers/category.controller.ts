import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { categoryService } from "../services/category.service";

export const CategoryController = {
  getCategories: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId } = req.params;

    const categories = await categoryService.getAll(userId, matrixId);

    res.status(200).json({
      success: true,
      data: categories,
    });
  }),

  createCategory: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId } = req.params;
    const { name, color } = req.body;

    const category = await categoryService.create(userId, matrixId, {
      name,
      color,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  }),

  editCategory: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId, categoryId } = req.params;
    const { name, color } = req.body;

    const updated = await categoryService.update(userId, matrixId, categoryId, {
      name,
      color,
    });

    res.status(200).json({
      success: true,
      data: updated,
    });
  }),

  deleteCategory: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId, categoryId } = req.params;

    await categoryService.delete(userId, matrixId, categoryId);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  }),
};
