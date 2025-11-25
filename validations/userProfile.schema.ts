import { z } from "zod";

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().pipe(z.email()).optional(),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
  }),
});
