import bcrypt from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { Client } from "../../entities/Client";
import {
  IAddressesRepository,
  ICreateAddressDTO,
} from "../../repositories/IAddressesRepository";
import { IClientsRepository } from "../../repositories/IClientsRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: ICreateAddressDTO;
}

interface IResponse {
  client: Client;
  address: {
    street: string;
    district: string;
    number: string;
    cep: string;
  };
}

@injectable()
class CreateClientUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository,
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  async execute({
    name,
    email,
    password,
    phone,
    address,
  }: IRequest): Promise<IResponse> {
    const clientAlreadyExists = await this.clientsRepository.findByEmail(email);

    if (clientAlreadyExists) {
      throw new AppError("Client already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await this.clientsRepository.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const clientAddress = await this.addressesRepository.create({
      ...address,
      clientId: client.id,
    });

    const responseClient: IResponse = {
      client,
      address: {
        street: clientAddress.street,
        district: clientAddress.district,
        number: clientAddress.number,
        cep: clientAddress.cep,
      },
    };

    return responseClient;
  }
}

export { CreateClientUseCase };