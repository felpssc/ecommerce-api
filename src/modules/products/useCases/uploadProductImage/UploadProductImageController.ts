import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { UploadProductImageUseCase } from "./UploadProductImageUseCase";

class UploadProductImageController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const files = request.files as Array<Express.Multer.File>;
    const { productId } = request.params;

    const uploadProductImageUseCase = container.resolve(
      UploadProductImageUseCase
    );

    await uploadProductImageUseCase.execute({
      files,
      productId,
    });

    return response.status(200).json({
      message: "Images uploaded successfully",
    });
  }
}

export { UploadProductImageController };
