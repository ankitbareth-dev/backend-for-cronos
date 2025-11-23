import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name is required"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be 6 chars long"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email("Invalid email"),
    password: z.string(),
  }),
});
