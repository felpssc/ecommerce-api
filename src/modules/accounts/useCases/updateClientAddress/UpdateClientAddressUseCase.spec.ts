import { AppError } from "../../../../shared/errors/AppError";
import { IAddressesRepository } from "../../repositories/IAddressesRepository";
import { AddressesRepositoryInMemory } from "../../repositories/in-memory/AddressesRepositoryInMemory";
import { UpdateClientAddressUseCase } from "./UpdateClientAddressUseCase";

let addressesRepository: IAddressesRepository;
let updateClientAddressUseCase: UpdateClientAddressUseCase;

describe("Update client address", () => {
  beforeEach(() => {
    addressesRepository = new AddressesRepositoryInMemory();
    updateClientAddressUseCase = new UpdateClientAddressUseCase(
      addressesRepository
    );
  });

  it("Should be able to update an address", async () => {
    const address = await addressesRepository.create({
      street: "Rua Teste",
      district: "Teste",
      number: "123",
      cep: "12345678",
      clientId: "client-id",
    });

    const updatedAddress = await updateClientAddressUseCase.execute(
      address.id,
      {
        street: "updated",
        district: "updated",
        number: "updated",
      }
    );

    expect(updatedAddress.street).toBe("updated");
    expect(updatedAddress.district).toBe("updated");
    expect(updatedAddress.number).toBe("updated");
  });

  it("Should not be able to update an address if it does not exist", async () => {
    await expect(
      updateClientAddressUseCase.execute("address-id", {
        street: "updated",
        district: "updated",
        number: "updated",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
