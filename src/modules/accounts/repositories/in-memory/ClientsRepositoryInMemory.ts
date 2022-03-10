import { Client } from "../../entities/Client";
import { IParams } from "../../useCases/listClients/ListClientsUseCase";
import {
  IClientsRepository,
  ICreateClientDTO,
  IUpdateClientDTO,
} from "../IClientsRepository";

class ClientsRepositoryInMemory implements IClientsRepository {
  private clients: Client[] = [];

  async create({
    name,
    email,
    password,
    phone,
  }: ICreateClientDTO): Promise<Client> {
    const client = new Client();

    Object.assign(client, {
      name,
      email,
      password,
      phone,
    });

    this.clients.push(client);

    return client;
  }

  async findByEmail(email: string): Promise<Client> {
    const client = this.clients.find((client) => client.email === email);

    return client;
  }

  async findById(id: string): Promise<Client> {
    const client = this.clients.find((client) => client.id === id);

    return client;
  }

  async activateClient(id: string): Promise<Client> {
    const client = this.clients.find((client) => client.id === id);

    if (client) {
      client.active = true;
    }

    return client;
  }

  async findAll({ email, active }: IParams): Promise<[Client[], number]> {
    let { clients } = this;

    if (email) {
      clients = clients.filter((client) => client.email === email);
    }

    if (active) {
      clients = clients.filter((client) => client.active === active);
    }

    const total = clients.length;

    return [clients, total];
  }

  async update(
    id: string,
    { name, password, phone }: IUpdateClientDTO
  ): Promise<Client> {
    const client = this.clients.find((client) => client.id === id);

    if (name) client.name = name;

    if (password) client.password = password;

    if (phone) client.phone = phone;

    return client;
  }

  async delete(id: string): Promise<void> {
    const clientIndex = this.clients.findIndex((client) => client.id === id);

    if (clientIndex >= 0) {
      this.clients.splice(clientIndex, 1);
    }
  }
}

export { ClientsRepositoryInMemory };
