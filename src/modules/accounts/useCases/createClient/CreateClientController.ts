import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { SendEmailVerification } from "../../../../helpers/sendEmailVerification/implementations/SendEmailVerification";
import { CreateClientUseCase } from "./CreateClientUseCase";

class CreateClientController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, phone } = request.body;

    const createClientUseCase = container.resolve(CreateClientUseCase);

    const client = await createClientUseCase.execute({
      name,
      email,
      password,
      phone,
    });

    const sendEmailVerification = container.resolve(SendEmailVerification);

    await sendEmailVerification.execute({
      email,
      client_id: client.id,
    });

    return response.status(201).json(client);
  }
}

export { CreateClientController };
