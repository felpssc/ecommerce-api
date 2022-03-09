import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

class DeleteProductController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductUseCase = container.resolve(DeleteProductUseCase);

    await deleteProductUseCase.execute(id);

    return response.status(200).send({
      message: "Product deleted successfully",
    });
  }
}

export { DeleteProductController };
