import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protectedRoute = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    const error: any = new Error("Not authorized");
    error.status = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    const error: any = new Error("Invalid token");
    error.status = 401;
    return next(error);
  }
};
