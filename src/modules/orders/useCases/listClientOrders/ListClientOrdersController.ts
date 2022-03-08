import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { ListClientOrdersUseCase } from "./ListClientOrdersUseCase";

class ListClientOrdersController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const listClientOrdersUseCase = container.resolve(ListClientOrdersUseCase);

    const orders = await listClientOrdersUseCase.execute(user.id);

    return response.json(orders);
  }
}

export { ListClientOrdersController };
