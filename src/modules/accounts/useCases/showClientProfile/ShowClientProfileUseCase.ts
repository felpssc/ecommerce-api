import { inject, injectable } from "tsyringe";

import { Client } from "../../entities/Client";
import { IClientsRepository } from "../../repositories/IClientsRepository";

@injectable()
class ShowClientProfileUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  public async execute(id: string): Promise<Client> {
    const client = await this.clientsRepository.findById(id);

    return client;
  }
}

export { ShowClientProfileUseCase };
