import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { DeleteClientAddressUseCase } from "./DeleteClientAddressUseCase";

class DeleteClientAddressController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteClientAddressUseCase = container.resolve(
      DeleteClientAddressUseCase
    );

    await deleteClientAddressUseCase.execute(id);

    return response.status(200).json({
      message: "Address deleted successfully",
    });
  }
}

export { DeleteClientAddressController };
