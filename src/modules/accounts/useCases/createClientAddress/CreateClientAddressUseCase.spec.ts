import { IAddressesRepository } from "../../repositories/IAddressesRepository";
import { AddressesRepositoryInMemory } from "../../repositories/in-memory/AddressesRepositoryInMemory";
import { CreateClientAddressUseCase } from "./CreateClientAddressUseCase";

let addressesRepository: IAddressesRepository;
let createClientAddressUseCase: CreateClientAddressUseCase;

describe("Create client address", () => {
  beforeEach(() => {
    addressesRepository = new AddressesRepositoryInMemory();
    createClientAddressUseCase = new CreateClientAddressUseCase(
      addressesRepository
    );
  });

  it("should create a new address", async () => {
    const address = await createClientAddressUseCase.execute({
      street: "Rua Teste",
      district: "Teste",
      number: "123",
      cep: "12345678",
      clientId: "client-id",
    });

    expect(address.street).toBe("Rua Teste");
    expect(address.district).toBe("Teste");
    expect(address.number).toBe("123");
    expect(address.cep).toBe("12345678");
    expect(address.clientId).toBe("client-id");
  });
});
