import { z } from "zod";

const cellSchema = z.object({
  index: z.number().int().min(0),
  colorHex: z
    .string()
    .regex(/^#([0-9A-Fa-f]{6})$/, "Invalid hex color")
    .nullable(),
});

export const getCellsSchema = z.object({
  params: z.object({
    matrixId: z.uuid(),
  }),
});

export const saveCellsSchema = z.object({
  params: z.object({
    matrixId: z.uuid(),
  }),
  body: z.object({
    cells: z
      .array(cellSchema)
      .min(1)
      .max(5000, "Too many cells in one request"),
  }),
});
