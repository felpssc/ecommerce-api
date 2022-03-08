import { Response, Request } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { IParams, ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { limit, offset, email, active, id }: IParams = request.query;

    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const clients = await listUsersUseCase.execute({
      limit,
      offset,
      email,
      active,
      id,
    });

    return response.json(clients);
  }
}

export { ListUsersController };
