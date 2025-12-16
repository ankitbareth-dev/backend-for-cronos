import { z } from "zod";

export const googleAuthSchema = z.object({
  body: z.object({
    idToken: z.string().nonempty("Google token is required"),
  }),
});
