import { inject, injectable } from "tsyringe";

import { UpdateClientSchema } from "../../../../helpers/validators/client/updateClient.validator";
import { AppError } from "../../../../shared/errors/AppError";
import {
  IClientsRepository,
  IUpdateClientDTO,
} from "../../repositories/IClientsRepository";

@injectable()
class UpdateClientProfileUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute(id, { name, password, phone }: IUpdateClientDTO) {
    const client = await this.clientsRepository.findById(id);

    if (!client) {
      throw new AppError("Client not found", 404);
    }

    const { error, value } = UpdateClientSchema.validate({
      name,
      password,
      phone,
    });

    if (error) {
      throw new AppError(error.message, 400);
    }

    const updatedClient = await this.clientsRepository.update(id, value);

    return updatedClient;
  }
}

export { UpdateClientProfileUseCase };
