import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { IParams } from "../../repositories/IOrdersRepository";
import { ListOrdersUseCase } from "./ListOrdersUseCase";

class ListOrdersController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      startDate,
      endDate,
      minPaymentPrice,
      maxPaymentPrice,
      clientId,
      status,
      productId,
      limit,
      offset,
    }: IParams = request.query;

    const listOrdersUseCase = container.resolve(ListOrdersUseCase);

    const orders = await listOrdersUseCase.execute({
      id,
      startDate,
      endDate,
      minPaymentPrice,
      maxPaymentPrice,
      clientId,
      status,
      productId,
      limit,
      offset,
    });

    return response.json(orders);
  }
}

export { ListOrdersController };
