import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { UpdateClientProfileUseCase } from "./UpdateClientProfileUseCase";

class UpdateClientProfileController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const updateClientProfile = container.resolve(UpdateClientProfileUseCase);

    const updatedClient = await updateClientProfile.execute(
      user.id,
      request.body
    );

    return response.json(updatedClient);
  }
}

export { UpdateClientProfileController };
