import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protectedRoute = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      const error: any = new Error("Not authorized");
      error.status = 401;
      return next(error);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = decoded;
    next();
  } catch (err) {
    const error: any = new Error("Invalid or expired token");
    error.status = 401;
    return next(error);
  }
};
