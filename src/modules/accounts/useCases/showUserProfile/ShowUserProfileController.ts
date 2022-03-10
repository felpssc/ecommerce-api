import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController implements IController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const showUserProfileUseCase = container.resolve(ShowUserProfileUseCase);

    const userProfile = await showUserProfileUseCase.execute(user.id);

    return response.json(userProfile.hidePassword);
  }
}

export { ShowUserProfileController };
