import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "../shared/errors/AppError";

export async function ensureClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  const [, token] = authHeader.split(" ");

  const { authenticated } = jwt.decode(token, { json: true });

  if (authenticated.user_type !== "client") {
    throw new AppError("Not authorized", 401);
  }

  return next();
}
