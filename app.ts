import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";

import { errorHandler } from "./middlewares/globalErrorHandler";
import { sanitizeInput } from "./middlewares/sanitizeInput";
import { globalLimiter } from "./middlewares/rateLimiter";

const app: Application = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

app.use(cors());
app.use(helmet());
app.use(hpp());

app.use(sanitizeInput);

app.use(globalLimiter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running",
  });
});
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use(errorHandler);

export default app;
