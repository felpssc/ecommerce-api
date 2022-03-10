import { IAddressesRepository } from "../../repositories/IAddressesRepository";
import { AddressesRepositoryInMemory } from "../../repositories/in-memory/AddressesRepositoryInMemory";
import { ListClientAddressesUseCase } from "./ListClientAddressesUseCase";

let addressesRepository: IAddressesRepository;
let listClientAddressesUseCase: ListClientAddressesUseCase;

describe("List client addresses", () => {
  beforeEach(() => {
    addressesRepository = new AddressesRepositoryInMemory();
    listClientAddressesUseCase = new ListClientAddressesUseCase(
      addressesRepository
    );
  });

  it("should list client addresses", async () => {
    await addressesRepository.create({
      street: "Rua Teste",
      district: "Teste",
      number: "123",
      cep: "12345678",
      clientId: "client-id",
    });

    await addressesRepository.create({
      street: "Rua Teste",
      district: "Teste",
      number: "123",
      cep: "12345678",
      clientId: "client-id",
    });

    const addresses = await listClientAddressesUseCase.execute("client-id");

    expect(addresses.length).toBe(2);
  });
});
