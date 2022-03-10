import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

class UpdateProductController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, characteristics, code } = request.body;

    const updateProductUseCase = container.resolve(UpdateProductUseCase);

    const updateProduct = await updateProductUseCase.execute(id, {
      name,
      price,
      characteristics,
      code,
    });

    return response.json(updateProduct);
  }
}

export { UpdateProductController };
