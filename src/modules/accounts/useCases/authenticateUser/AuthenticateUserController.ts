import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const { user, token } = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}

export { AuthenticateUserController };
