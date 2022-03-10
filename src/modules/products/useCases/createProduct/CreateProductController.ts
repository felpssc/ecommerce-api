import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController implements IController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, price, code, characteristics } = request.body;

    const createProductUse = container.resolve(CreateProductUseCase);

    const product = await createProductUse.execute({
      name,
      price,
      code,
      characteristics,
    });

    return response.status(201).json(product);
  }
}

export { CreateProductController };
