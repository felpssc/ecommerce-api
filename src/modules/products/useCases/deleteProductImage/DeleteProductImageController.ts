import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { DeleteProductImageUseCase } from "./DeleteProductImageUseCase";

class DeleteProductImageController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { imageId } = request.params;

    const deleteProductImageUseCase = container.resolve(
      DeleteProductImageUseCase
    );

    await deleteProductImageUseCase.execute(imageId);

    return response.status(200).send({
      message: "Image deleted successfully",
    });
  }
}

export { DeleteProductImageController };
