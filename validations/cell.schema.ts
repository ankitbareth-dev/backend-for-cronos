import { z } from "zod";

export const saveCellsSchema = z.object({
  body: z.object({
    matrixId: z.uuid("Invalid matrixId"),
    cells: z.array(
      z.object({
        index: z.number().int().min(0),
        colorHex: z
          .string()
          .regex(/^#([0-9A-Fa-f]{6})$/, "Invalid hex color")
          .nullable(),
      })
    ),
  }),
});
