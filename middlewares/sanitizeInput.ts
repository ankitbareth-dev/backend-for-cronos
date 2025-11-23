import { Request, Response, NextFunction } from "express";
import sanitizeHtml from "sanitize-html";

export function sanitizeInput(req: Request, res: Response, next: NextFunction) {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = sanitizeHtml(req.body[key]);
      }
    }
  }
  next();
}
