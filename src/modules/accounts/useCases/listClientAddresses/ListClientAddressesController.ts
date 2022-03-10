import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { ListClientAddressesUseCase } from "./ListClientAddressesUseCase";

class ListClientAddressesController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const listClientAddressesUseCase = container.resolve(
      ListClientAddressesUseCase
    );

    const addresses = await listClientAddressesUseCase.execute(user.id);

    return response.json(addresses);
  }
}

export { ListClientAddressesController };
