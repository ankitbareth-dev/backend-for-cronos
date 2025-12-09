import { Request, Response } from "express";
import { categoryService } from "../services/category.service";

export const CategoryController = {
  getCategories: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId } = req.params;

    try {
      const categories = await categoryService.getAll(userId, matrixId);
      res.status(200).json({ success: true, data: categories });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  createCategory: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId, name, color } = req.body;

    try {
      const category = await categoryService.create(userId, matrixId, {
        name,
        color,
      });
      res.status(201).json({ success: true, data: category });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  editCategory: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId, categoryId, name, color } = req.body;

    try {
      const updated = await categoryService.update(
        userId,
        matrixId,
        categoryId,
        { name, color }
      );
      res.status(200).json({ success: true, data: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  deleteCategory: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId, categoryId } = req.body;

    try {
      await categoryService.delete(userId, matrixId, categoryId);
      res.status(200).json({ success: true, message: "Category deleted" });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};
