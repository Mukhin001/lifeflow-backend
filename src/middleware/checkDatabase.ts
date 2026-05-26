import mongoose from "mongoose";
import type { Request, Response, NextFunction } from "express";

export const checkDatabase = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: "База данных MongoDB недоступна",
    });
  }

  next();
};
