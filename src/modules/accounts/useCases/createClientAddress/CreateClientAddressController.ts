import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { CreateClientAddressUseCase } from "./CreateClientAddressUseCase";

class CreateClientAddressController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { street, district, number, cep } = request.body;

    const createClientAddressUseCase = container.resolve(
      CreateClientAddressUseCase
    );

    const address = await createClientAddressUseCase.execute({
      street,
      district,
      number,
      cep,
      clientId: user.id,
    });

    return response.json(address);
  }
}

export { CreateClientAddressController };
