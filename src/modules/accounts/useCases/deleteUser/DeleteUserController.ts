import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController implements IController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    await deleteUserUseCase.execute(user.id);

    return response.status(200).send({
      message: "Conta deletada com sucesso",
    });
  }
}

export { DeleteUserController };
