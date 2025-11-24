import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error:", err);

  const status = err.status || err.statusCode || 400;

  return res.status(status).json({
    success: false,
    message: err.message || "Something went wrong",
  });
}
