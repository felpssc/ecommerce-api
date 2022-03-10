import { getRepository, Repository } from "typeorm";

import { Address } from "../../entities/Address";
import {
  IAddressesRepository,
  ICreateAddressDTO,
  IUpdateAddressDTO,
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

  async findById(id: string): Promise<Address> {
    const address = await this.repository.findOne(id);

    return address;
  }

  async findByClientId(clientId: string): Promise<Address[]> {
    const addresses = await this.repository.find({
      where: {
        clientId,
      },
    });

    return addresses;
  }

  async update(
    id: string,
    { street, district, number, cep }: IUpdateAddressDTO
  ) {
    const address = await this.repository.findOne(id);

    if (street) address.street = street;
    if (district) address.district = district;
    if (number) address.number = number;
    if (cep) address.cep = cep;

    await this.repository.save(address);

    return address;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { AddressesRepository };
