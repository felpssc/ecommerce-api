import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { SendEmailVerification } from "../../../../helpers/sendEmailVerification/implementations/SendEmailVerification";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({ email, password });

    const sendEmailVerification = container.resolve(SendEmailVerification);

    await sendEmailVerification.execute({
      email,
      user_id: user.id,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
