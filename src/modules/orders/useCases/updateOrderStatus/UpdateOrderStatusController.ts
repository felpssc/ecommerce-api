import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { UpdateOrderStatusUseCase } from "./UpdateOrderStatusUseCase";

class UpdateOrderStatusController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { status } = request.body;

    const updateOrderStatusUseCase = container.resolve(
      UpdateOrderStatusUseCase
    );

    const updatedOrder = await updateOrderStatusUseCase.execute(id, status);

    return response.json(updatedOrder);
  }
}

export { UpdateOrderStatusController };
