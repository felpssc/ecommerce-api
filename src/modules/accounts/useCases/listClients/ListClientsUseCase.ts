import { inject, injectable } from "tsyringe";

import { Client } from "../../entities/Client";
import { IClientsRepository } from "../../repositories/IClientsRepository";

interface IParams {
  limit?: number | 10;
  offset?: number | 0;
  active?: boolean;
  email?: string;
  id?: string;
}

@injectable()
class ListClientsUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute({
    limit,
    offset,
    active,
    email,
    id,
  }: IParams): Promise<[Client[], number]> {
    const clients = await this.clientsRepository.findAll({
      limit,
      offset,
      email,
      active,
      id,
    });

    return clients;
  }
}

export { ListClientsUseCase, IParams };
