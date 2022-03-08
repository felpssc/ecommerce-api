import { getRepository, Repository } from "typeorm";

import { Client } from "../../entities/Client";
import { IParams } from "../../useCases/listClients/ListClientsUseCase";
import { IClientsRepository, ICreateClientDTO } from "../IClientsRepository";

class ClientsRepository implements IClientsRepository {
  private repository: Repository<Client>;

  constructor() {
    this.repository = getRepository(Client);
  }

  async create({
    name,
    email,
    password,
    phone,
  }: ICreateClientDTO): Promise<Client> {
    const client = this.repository.create({
      name,
      email,
      password,
      phone,
    });

    await this.repository.save(client);

    return client;
  }

  async findByEmail(email: string): Promise<Client> {
    const client = await this.repository.findOne({ where: { email } });

    return client;
  }

  async findById(id: string): Promise<Client> {
    const client = await this.repository.findOne({ where: { id } });

    return client;
  }

  async findAll({
    limit,
    offset,
    email,
    active,
    id,
  }: IParams): Promise<[Client[], number]> {
    const filters: IParams = {};

    if (email) {
      filters.email = email;
    }

    if (active) {
      filters.active = active;
    }

    if (id) {
      filters.id = id;
    }

    const clients = await this.repository.findAndCount({
      skip: offset || 0,
      take: limit || 10,
      select: [
        "id",
        "name",
        "email",
        "phone",
        "active",
        "created_at",
        "updated_at",
      ],
      where: filters,
    });

    return clients;
  }

  async activateClient(id: string): Promise<Client> {
    const client = await this.repository.findOne({ where: { id } });

    client.active = true;

    await this.repository.save(client);

    return client;
  }
}

export { ClientsRepository };
