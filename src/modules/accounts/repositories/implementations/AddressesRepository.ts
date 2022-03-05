import { getRepository, Repository } from "typeorm";

import { Address } from "../../entities/Address";
import {
  IAddressesRepository,
  ICreateAddressDTO,
} from "../IAddressesRepository";

class AddressesRepository implements IAddressesRepository {
  private repository: Repository<Address>;

  constructor() {
    this.repository = getRepository(Address);
  }

  async create({
    street,
    district,
    number,
    cep,
    clientId,
  }: ICreateAddressDTO): Promise<Address> {
    const address = this.repository.create({
      street,
      district,
      number,
      cep,
      clientId,
    });

    await this.repository.save(address);

    return address;
  }

  async findByUserId(userId: string): Promise<Address[]> {
    const addresses = await this.repository.find({
      where: {
        clientId: userId,
      },
    });

    return addresses;
  }
}

export { AddressesRepository };
