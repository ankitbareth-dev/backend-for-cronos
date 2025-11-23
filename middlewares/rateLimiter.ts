import rateLimit, {
  RateLimitExceededEventHandler,
  Options,
} from "express-rate-limit";
import { Request, Response, NextFunction } from "express";

const rateLimitHandler: RateLimitExceededEventHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  optionsUsed: Options
) => {
  // Correct way to access rate-limit info:
  const statusCode = req.rateLimit?.statusCode || 429;

  return res.status(statusCode).json({
    success: false,
    message: "Too many requests, please try again later.",
  });
};

const globalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: process.env.NODE_ENV === "production" ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: process.env.NODE_ENV === "production" ? 20 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

export { globalLimiter, authLimiter };
