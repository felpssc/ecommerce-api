import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { AuthenticateClientUseCase } from "./AuthenticateClientUseCase";

class AuthenticateClientController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateClientUseCase = container.resolve(
      AuthenticateClientUseCase
    );

    const { client, token } = await authenticateClientUseCase.execute({
      email,
      password,
    });

    return response.json({ client, token });
  }
}

export { AuthenticateClientController };
