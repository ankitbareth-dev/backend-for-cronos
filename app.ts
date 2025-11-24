import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";

import { errorHandler } from "./middlewares/globalErrorHandler";
import { sanitizeInput } from "./middlewares/sanitizeInput";
import { globalLimiter, authLimiter } from "./middlewares/rateLimiter";

import authRoutes from "./routes/auth.routes";

const app: Application = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

// Parse JSON
app.use(express.json({ limit: "1mb" }));

// Handle malformed JSON errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing JSON payload",
    });
  }
  next();
});

// Check for empty body for POST, PUT, PATCH requests
app.use((req: Request, res: Response, next: NextFunction) => {
  if (
    ["POST", "PUT", "PATCH"].includes(req.method) &&
    (!req.body || Object.keys(req.body).length === 0)
  ) {
    return res.status(400).json({
      success: false,
      message: "Request body is required",
    });
  }
  next();
});

// Parse URL-encoded bodies
app.use(express.urlencoded({ limit: "1mb", extended: true }));

app.use(cors());
app.use(helmet());
app.use(hpp());

app.use(sanitizeInput);

app.use(globalLimiter);

app.post("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Api is running",
  });
});

app.use("/api/auth", authLimiter, authRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use(errorHandler);

export default app;
