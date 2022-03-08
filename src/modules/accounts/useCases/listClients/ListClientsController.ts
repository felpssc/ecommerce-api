import { Response, Request } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { IParams, ListClientsUseCase } from "./ListClientsUseCase";

class ListClientsController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { limit, offset, email, active, id }: IParams = request.query;

    const listClientsUseCase = container.resolve(ListClientsUseCase);

    const clients = await listClientsUseCase.execute({
      limit,
      offset,
      email,
      active,
      id,
    });

    return response.json(clients);
  }
}

export { ListClientsController };
