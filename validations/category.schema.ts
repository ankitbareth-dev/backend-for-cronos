import { z } from "zod";

export const getCategoriesSchema = z.object({
  params: z.object({
    matrixId: z.uuid(),
  }),
});

export const createCategorySchema = z.object({
  params: z.object({
    matrixId: z.uuid(),
  }),
  body: z.object({
    name: z.string().min(1),
    color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Invalid hex color"),
  }),
});

export const editCategorySchema = z.object({
  params: z.object({
    matrixId: z.uuid(),
    categoryId: z.uuid(),
  }),
  body: z.object({
    name: z.string().min(1),
    color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Invalid hex color"),
  }),
});

export const deleteCategorySchema = z.object({
  params: z.object({
    matrixId: z.uuid(),
    categoryId: z.uuid(),
  }),
});
