import { Request, Response, NextFunction } from "express";

export const emptyBodyHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    ["POST", "PUT"].includes(req.method) &&
    (!req.body || Object.keys(req.body).length === 0)
  ) {
    return res.status(400).json({
      success: false,
      message: "Request body is required",
    });
  }
  next();
};
