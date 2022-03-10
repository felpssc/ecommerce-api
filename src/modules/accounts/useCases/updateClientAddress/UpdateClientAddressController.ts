import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { UpdateClientAddressUseCase } from "./UpdateClientAddressUseCase";

class UpdateClientAddressController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { street, district, number, cep } = request.body;

    const updateClientAddressUseCase = container.resolve(
      UpdateClientAddressUseCase
    );

    const address = await updateClientAddressUseCase.execute(id, {
      street,
      district,
      number,
      cep,
    });

    return response.json(address);
  }
}

export { UpdateClientAddressController };
