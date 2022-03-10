import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { CreateOrderUseCase } from "./CreateOrderUseCase";

class CreateOrderController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { items } = request.body;

    const createOrderUseCase = container.resolve(CreateOrderUseCase);

    const order = await createOrderUseCase.execute({
      items,
      clientId: request.user.id,
    });

    return response.status(201).json(order);
  }
}

export { CreateOrderController };
