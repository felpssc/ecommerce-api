import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { IParams } from "../../repositories/IProductsRepository";
import { ListProductsUseCase } from "./ListProductsUseCase";

class ListProductsController implements IController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { limit, offset, name, minPrice, maxPrice, code, id }: IParams =
      request.query;

    const listProductsUseCase = container.resolve(ListProductsUseCase);

    const products = await listProductsUseCase.execute({
      limit,
      offset,
      name,
      minPrice,
      maxPrice,
      code,
      id,
    });

    return response.json(products);
  }
}

export { ListProductsController };
