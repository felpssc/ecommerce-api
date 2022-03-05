import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IAccountVerificationRepository } from "../../repositories/IAccountVerificationRepository";
import { IClientsRepository } from "../../repositories/IClientsRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class VerifyAccountUseCase {
  constructor(
    @inject("AccountVerificationRepository")
    private accountVerificationRepository: IAccountVerificationRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute(code: string): Promise<void> {
    const codeExists = await this.accountVerificationRepository.findByCode(
      code
    );

    if (!codeExists) {
      throw new AppError(
        "Invalid verification code or account already verified."
      );
    }

    if (codeExists.user_id) {
      await this.usersRepository.activateUser(codeExists.user_id);
    }

    if (codeExists.client_id) {
      await this.clientsRepository.activateClient(codeExists.client_id);
    }

    await this.accountVerificationRepository.deleteById(codeExists.id);
  }
}

export { VerifyAccountUseCase };
