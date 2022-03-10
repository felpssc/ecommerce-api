import { Address } from "../../entities/Address";
import {
  IAddressesRepository,
  ICreateAddressDTO,
  IUpdateAddressDTO,
} from "../IAddressesRepository";

class AddressesRepositoryInMemory implements IAddressesRepository {
  private addresses: Address[] = [];

  async create({
    street,
    district,
    number,
    cep,
    clientId,
  }: ICreateAddressDTO): Promise<Address> {
    const address = new Address();

    Object.assign(address, {
      street,
      district,
      number,
      cep,
      clientId,
    });

    this.addresses.push(address);

    return address;
  }

  async findById(id: string): Promise<Address> {
    const address = this.addresses.find((address) => address.id === id);

    return address;
  }

  async findByClientId(clientId: string): Promise<Address[]> {
    const addresses = this.addresses.filter(
      (address) => address.clientId === clientId
    );

    return addresses;
  }

  async update(
    id: string,
    { street, district, number, cep }: IUpdateAddressDTO
  ): Promise<Address> {
    const address = this.addresses.find((address) => address.id === id);

    if (street) address.street = street;

    if (district) address.district = district;

    if (number) address.number = number;

    if (cep) address.cep = cep;

    return address;
  }

  async delete(id: string): Promise<void> {
    const addressIndex = this.addresses.findIndex(
      (address) => address.id === id
    );

    this.addresses.splice(addressIndex, 1);
  }
}

export { AddressesRepositoryInMemory };
