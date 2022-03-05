import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { jwtUserSecret } from "../../../../config/config";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email or password", 401);
    }

    if (!user.active) {
      throw new AppError("Please confirm your email address", 401);
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Incorrect email or password", 401);
    }

    const token = jwt.sign(
      {
        user: {
          email: user.email,
          user_type: "user",
        },
      },
      jwtUserSecret,
      {
        subject: user.id,
      }
    );

    const responseToken: IResponse = {
      user: {
        email: user.email,
      },
      token,
    };

    return responseToken;
  }
}

export { AuthenticateUserUseCase };
