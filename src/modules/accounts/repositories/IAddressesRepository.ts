import { Address } from "../entities/Address";

interface ICreateAddressDTO {
  street: string;
  district: string;
  number: string;
  cep: string;
  clientId: string;
}

interface IAddressesRepository {
  create({
    street,
    district,
    number,
    cep,
    clientId,
  }: ICreateAddressDTO): Promise<Address>;
  findByUserId(userId: string): Promise<Address[]>;
}

export { IAddressesRepository, ICreateAddressDTO };
