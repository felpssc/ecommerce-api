import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { jwtSecret } from "../config/config";
import { ClientsRepository } from "../modules/accounts/repositories/implementations/ClientsRepository";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";
import { AppError } from "../shared/errors/AppError";

interface IPayload {
  authenticated: {
    email: string;
    user_type: string;
  };
  iat: number;
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  const { authenticated, sub } = jwt.verify(token, jwtSecret) as IPayload;

  if (!authenticated) {
    throw new AppError("Invalid token", 401);
  }

  const usersRepository = new UsersRepository();
  const clientsRepository = new ClientsRepository();

  if (authenticated.user_type === "user") {
    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError("User does not exists.", 401);
    }
  }

  if (authenticated.user_type === "client") {
    const client = await clientsRepository.findById(sub);

    if (!client) {
      throw new AppError("Client does not exists.", 401);
    }
  }

  return next();
}
