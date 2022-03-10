import { inject, injectable } from "tsyringe";

import { IClientsRepository } from "../../repositories/IClientsRepository";

@injectable()
class DeleteClientUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.clientsRepository.delete(id);
  }
}

export { DeleteClientUseCase };
