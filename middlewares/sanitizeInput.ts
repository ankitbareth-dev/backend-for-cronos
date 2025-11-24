import { Request, Response, NextFunction } from "express";
import xss from "xss";

type AnyData = string | number | boolean | object | null | undefined;

const clean = (data: AnyData): AnyData => {
  if (typeof data === "string") return xss(data.trim());

  if (Array.isArray(data)) return data.map((item) => clean(item));

  if (data && typeof data === "object" && !Buffer.isBuffer(data)) {
    const cleaned: Record<string, any> = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        cleaned[key] = clean((data as any)[key]);
      }
    }
    return cleaned;
  }

  return data;
};

export const sanitizeInput = (
  req: Request & {
    sanitizedQuery?: any;
    sanitizedParams?: any;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body) req.body = clean(req.body);
    if (req.query) req.sanitizedQuery = clean(req.query);
    if (req.params) req.sanitizedParams = clean(req.params);

    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid input format",
    });
  }
};
