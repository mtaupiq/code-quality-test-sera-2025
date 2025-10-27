import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    stack: err.stack,
    details: err,
  });
};

export const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error occurred:", err);

  res.status(500).json({
    message: err.message,
    error: err,
  });
};
