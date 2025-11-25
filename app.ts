import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";

import { errorHandler } from "./middlewares/globalErrorHandler";
import { sanitizeInput } from "./middlewares/sanitizeInput";
import { globalLimiter, authLimiter } from "./middlewares/rateLimiter";
import { unknownRouteHandler } from "./utils/unknownRoutehandler";
import { handleMalformedJson } from "./middlewares/handleMalformedJson";
import { emptyBodyHandler } from "./middlewares/emptyBodyHandler";

import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/updateProfile.routes";

const app: Application = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json({ limit: "1mb" }));

app.use(handleMalformedJson);

app.use(emptyBodyHandler);

app.use(express.urlencoded({ limit: "1mb", extended: true }));

app.use(cors());
app.use(helmet());
app.use(hpp());

app.use(sanitizeInput);

app.use(globalLimiter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Api is running",
  });
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/profile", profileRoutes);

app.use(unknownRouteHandler);

app.use(errorHandler);

export default app;
