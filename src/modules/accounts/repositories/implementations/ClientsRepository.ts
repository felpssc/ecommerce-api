import bcrypt from "bcrypt";
import { getRepository, Repository } from "typeorm";

import { Client } from "../../entities/Client";
import { IParams } from "../../useCases/listClients/ListClientsUseCase";
import {
  IClientsRepository,
  ICreateClientDTO,
  IUpdateClientDTO,
} from "../IClientsRepository";

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

  async update(
    id: string,
    { name, password, phone }: IUpdateClientDTO
  ): Promise<Client> {
    const updateUser: IUpdateClientDTO = {};

    if (password) {
      updateUser.password = await bcrypt.hash(password, 10);
    }

    if (name) {
      updateUser.name = name;
    }

    if (phone) {
      updateUser.phone = phone;
    }

    await this.repository.update(id, updateUser);

    return (await this.repository.findOne({ where: { id } })).hidePassword;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}

export { ClientsRepository };
