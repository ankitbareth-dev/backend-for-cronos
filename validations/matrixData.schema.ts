import { z } from "zod";

export const getMatrixDataSchema = z.object({
  params: z.object({
    matrixId: z.uuid({ message: "Invalid matrixId" }),
  }),
});
