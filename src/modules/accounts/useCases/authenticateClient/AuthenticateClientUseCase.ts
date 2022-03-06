import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { jwtSecret } from "../../../../config/config";
import { AppError } from "../../../../shared/errors/AppError";
import { IClientsRepository } from "../../repositories/IClientsRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  client: {
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateClientUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const client = await this.clientsRepository.findByEmail(email);

    if (!client) {
      throw new AppError("Incorrect email or password", 401);
    }

    if (!client.active) {
      throw new AppError("Please confirm your email address", 401);
    }

    const passwordMath = bcrypt.compareSync(password, client.password);

    if (!passwordMath) {
      throw new AppError("Incorrect email or password", 401);
    }

    const token = jwt.sign(
      {
        client: {
          email: client.email,
          user_type: "client",
        },
      },
      jwtSecret,
      {
        subject: client.id,
      }
    );

    const responseToken: IResponse = {
      client: {
        email: client.email,
      },
      token,
    };

    return responseToken;
  }
}

export { AuthenticateClientUseCase };
