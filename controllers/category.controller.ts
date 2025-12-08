import { Request, Response } from "express";
import { categoryService } from "../services/category.service";

export const CategoryController = {
  createCategory: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId } = req.body;

    const category = await categoryService.create(userId, matrixId, req.body);

    res.status(201).json({ success: true, data: category });
  },

  editCategory: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId, categoryId, name, color } = req.body;

    const updated = await categoryService.update(userId, matrixId, categoryId, {
      name,
      color,
    });

    res.status(200).json({ success: true, data: updated });
  },

  deleteCategory: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { matrixId, categoryId } = req.body;

    await categoryService.delete(userId, matrixId, categoryId);

    res.status(200).json({ success: true, message: "Category deleted" });
  },
};
