import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/IController";
import { VerifyAccountUseCase } from "./VerifyAccountUseCase";

class VerifyAccountController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;

    const verifyAccountUseCase = container.resolve(VerifyAccountUseCase);

    await verifyAccountUseCase.execute(code);

    return response.status(200).send("Account verified successfully.");
  }
}

export { VerifyAccountController };
