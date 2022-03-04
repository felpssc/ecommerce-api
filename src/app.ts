import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";

import { router } from "./routes";
import { AppError } from "./shared/errors/AppError";

const app = express();

app.use(express.json());

app.use("/api", router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: `Internal Server Error - ${err.message}`,
    });
  }
);

export { app };
