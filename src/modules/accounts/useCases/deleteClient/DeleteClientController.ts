import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { DeleteClientUseCase } from "./DeleteClientUseCase";

class DeleteClientController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const deleteClientUseCase = container.resolve(DeleteClientUseCase);

    await deleteClientUseCase.execute(user.id);

    return response.status(200).json({ message: "Conta deletada com sucesso" });
  }
}

export { DeleteClientController };
