import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        const formatted: Record<string, string> = {};

        err.issues.forEach((issue) => {
          const field = issue.path[1];

          if (typeof field === "string") {
            formatted[field] = issue.message;
          }
        });

        return res.status(400).json({
          success: false,
          errors: formatted,
        });
      }

      next(err);
    }
  };
};
