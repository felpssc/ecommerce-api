import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { ShowClientProfileUseCase } from "./ShowClientProfileUseCase";

class ShowClientProfileController implements IController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const showClientProfileUseCase = container.resolve(
      ShowClientProfileUseCase
    );

    const client = await showClientProfileUseCase.execute(user.id);

    return response.json(client.hidePassword);
  }
}

export { ShowClientProfileController };
