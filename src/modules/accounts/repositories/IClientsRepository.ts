import { Client } from "../entities/Client";

interface ICreateClientDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface IClientsRepository {
  create({ name, email, password, phone }: ICreateClientDTO): Promise<Client>;
  findByEmail(email: string): Promise<Client | undefined>;
  findById(id: string): Promise<Client | undefined>;
  activateClient(id: string): Promise<Client | undefined>;
}

export { IClientsRepository, ICreateClientDTO };
