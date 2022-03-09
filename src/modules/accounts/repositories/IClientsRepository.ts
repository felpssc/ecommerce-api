import { Client } from "../entities/Client";
import { IParams } from "../useCases/listClients/ListClientsUseCase";

interface ICreateClientDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface IUpdateClientDTO {
  name?: string;
  password?: string;
  phone?: string;
}

interface IClientsRepository {
  create({ name, email, password, phone }: ICreateClientDTO): Promise<Client>;
  findByEmail(email: string): Promise<Client | undefined>;
  findById(id: string): Promise<Client | undefined>;
  activateClient(id: string): Promise<Client | undefined>;
  findAll({
    limit,
    offset,
    email,
    active,
  }: IParams): Promise<[Client[], number]>;
  update(
    id: string,
    { name, password, phone }: IUpdateClientDTO
  ): Promise<Client | undefined>;
  delete(id: string): Promise<void>;
}

export { IClientsRepository, ICreateClientDTO, IUpdateClientDTO };
