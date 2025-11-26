import { Request, Response } from "express";
import { categoryService } from "../services/category.service";

export const CategoryController = {
  getCategories: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const categories = await categoryService.getAll(userId);

    res.status(200).json({
      success: true,
      data: categories,
    });
  },

  createCategory: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const category = await categoryService.create(userId, req.body);

    res.status(201).json({
      success: true,
      data: category,
    });
  },

  editCategory: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { categoryId, name, color } = req.body;

    const updated = await categoryService.update(userId, categoryId, {
      name,
      color,
    });

    res.status(200).json({
      success: true,
      data: updated,
    });
  },

  deleteCategory: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { categoryId } = req.body;

    await categoryService.delete(userId, categoryId);

    res.status(200).json({
      success: true,
      message: "Category deleted",
    });
  },
};
