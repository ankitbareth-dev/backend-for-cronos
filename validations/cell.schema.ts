import { z } from "zod";

export const getCellsSchema = z.object({
  params: z.object({
    matrixId: z.uuid({ message: "Invalid matrixId" }),
  }),
});

export const saveCellsSchema = z.object({
  body: z.object({
    matrixId: z.uuid({ message: "Invalid matrixId" }),
    cells: z.array(
      z.object({
        dayIndex: z.number().min(0).max(6),
        startTime: z.string(),
        endTime: z.string(),
        categoryId: z
          .uuid({ message: "Invalid CategoryId" })
          .optional()
          .nullable(),
      })
    ),
  }),
});
