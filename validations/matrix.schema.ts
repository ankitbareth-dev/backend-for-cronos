import { z } from "zod";

export const createMatrixSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Matrix name is required"),

    startDate: z.coerce.date({ message: "Invalid startDate" }),
    endDate: z.coerce.date({ message: "Invalid endDate" }),

    startTime: z.string().min(1),
    endTime: z.string().min(1),
    interval: z.coerce.number().min(1),
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
    matrixId: z.uuid({ message: "Invalid matrixId" }),
  }),
});
