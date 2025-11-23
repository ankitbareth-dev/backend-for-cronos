export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;

    // Only needed to fix TypeScript's prototype chain
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture stack trace (excluding constructor call)
    Error.captureStackTrace(this, this.constructor);
  }
}
