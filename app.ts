import express, { Application, Request, Response } from "express";

const app: Application = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Api is working",
  });
});

export default app;
