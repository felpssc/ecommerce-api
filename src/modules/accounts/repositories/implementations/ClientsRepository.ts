import { getRepository, Repository } from "typeorm";

import { Client } from "../../entities/Client";
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

  async activateClient(id: string): Promise<Client> {
    const client = await this.repository.findOne({ where: { id } });

    client.active = true;

    await this.repository.save(client);

    return client;
  }
}

export { ClientsRepository };
