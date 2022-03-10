import { Address } from "../entities/Address";

interface ICreateAddressDTO {
  street: string;
  district: string;
  number: string;
  cep: string;
  clientId: string;
}

interface IUpdateAddressDTO {
  street?: string;
  district?: string;
  number?: string;
  cep?: string;
}

interface IAddressesRepository {
  create({
    street,
    district,
    number,
    cep,
    clientId,
  }: ICreateAddressDTO): Promise<Address>;
  findById(id: string): Promise<Address>;
  findByClientId(clientId: string): Promise<Address[]>;
  update(
    id: string,
    { street, district, number, cep }: IUpdateAddressDTO
  ): Promise<Address>;
  delete(id: string): Promise<void>;
}

export { IAddressesRepository, ICreateAddressDTO, IUpdateAddressDTO };
