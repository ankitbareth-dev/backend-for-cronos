import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";

const app: Application = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

app.use(cors());
app.use(helmet());
app.use(hpp());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Api is working",
  });
});

export default app;
