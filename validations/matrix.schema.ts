import { z } from "zod";

export const createMatrixSchema = z.object({
  body: z
    .object({
      name: z.string().min(1, "Matrix name is required"),

      startDate: z.coerce.date(),
      endDate: z.coerce.date(),

      startTime: z.string().min(1),
      endTime: z.string().min(1),

      interval: z.coerce.number().int().min(1).max(1440),
    })
    .refine((data) => data.endDate > data.startDate, {
      message: "endDate must be after startDate",
      path: ["endDate"],
    }),
});

export const editMatrixSchema = z.object({
  params: z.object({
    matrixId: z.uuid(),
  }),
  body: z.object({
    name: z.string().min(1),
  }),
});

export const deleteMatrixSchema = z.object({
  params: z.object({
    matrixId: z.uuid(),
  }),
});
