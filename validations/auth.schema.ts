import { z } from "zod";

export const signupSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .nonempty("Name is required")
        .min(2, "Name must be at least 2 characters")
        .regex(/^[A-Za-z0-9 _.\-]+$/, "Name is invalid"),

      email: z
        .string()
        .nonempty("Email is required")
        .pipe(z.email("Invalid email")),

      password: z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters"),
    })
    .strict(),
});

export const loginSchema = z.object({
  body: z
    .object({
      email: z
        .string()
        .nonempty("Email is required")
        .pipe(z.email("Invalid email")),

      password: z.string().nonempty("Password is required"),
    })
    .strict(),
});
