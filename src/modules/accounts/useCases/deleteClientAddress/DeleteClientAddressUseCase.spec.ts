import { IAddressesRepository } from "../../repositories/IAddressesRepository";
import { AddressesRepositoryInMemory } from "../../repositories/in-memory/AddressesRepositoryInMemory";
import { DeleteClientAddressUseCase } from "./DeleteClientAddressUseCase";

let addressesRepository: IAddressesRepository;
let deleteClientAddressUseCase: DeleteClientAddressUseCase;

describe("Delete client address", () => {
  beforeEach(() => {
    addressesRepository = new AddressesRepositoryInMemory();
    deleteClientAddressUseCase = new DeleteClientAddressUseCase(
      addressesRepository
    );
  });

  it("Should be able to delete an address", async () => {
    const address = await addressesRepository.create({
      street: "Rua Teste",
      district: "Teste",
      number: "123",
      cep: "12345678",
      clientId: "client-id",
    });

    await deleteClientAddressUseCase.execute(address.id);

    const addresses = await addressesRepository.delete("client-id");

    expect(addresses).toBeUndefined();
  });
});
