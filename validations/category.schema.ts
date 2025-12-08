import { z } from "zod";

export const getCategoriesSchema = z.object({
  body: z.object({
    matrixId: z.uuid({ message: "Invalid matrixId" }),
  }),
});

export const createCategorySchema = z.object({
  body: z.object({
    matrixId: z.uuid({ message: "matrixId is required" }),
    name: z.string().min(1, "Category name is required"),
    color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Invalid hex color"),
  }),
});

export const editCategorySchema = z.object({
  body: z.object({
    matrixId: z.uuid({ message: "matrixId is required" }),
    categoryId: z.uuid({ message: "Invalid categoryId" }),
    name: z.string().min(1, "Category name is required"),
    color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Invalid hex color"),
  }),
});

export const deleteCategorySchema = z.object({
  body: z.object({
    matrixId: z.uuid({ message: "matrixId is required" }),
    categoryId: z.uuid({ message: "Invalid categoryId" }),
  }),
});
