import { Request, Response, NextFunction } from "express";

export const handleMalformedJson = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing JSON payload",
    });
  }
  next();
};
