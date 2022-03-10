import { AppError } from "../../../../shared/errors/AppError";
import { IClientsRepository } from "../../repositories/IClientsRepository";
import { ClientsRepositoryInMemory } from "../../repositories/in-memory/ClientsRepositoryInMemory";
import { UpdateClientProfileUseCase } from "./UpdateClientProfileUseCase";

let clientsRepositoryInMemory: IClientsRepository;
let updateClientProfileUseCase: UpdateClientProfileUseCase;

describe("Update client profile", () => {
  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    updateClientProfileUseCase = new UpdateClientProfileUseCase(
      clientsRepositoryInMemory
    );
  });

  it("Should be able to update a client profile", async () => {
    const createdClient = await clientsRepositoryInMemory.create({
      name: "John Doe",
      email: "",
      password: "",
      phone: "11999999999",
    });

    await clientsRepositoryInMemory.activateClient(createdClient.id);

    const updatedClient = await updateClientProfileUseCase.execute(
      createdClient.id,
      {
        name: "John Doe Updated",
      }
    );

    const client = await clientsRepositoryInMemory.findById(createdClient.id);

    expect(updatedClient).toBeTruthy();
    expect(updatedClient.name).toBe("John Doe Updated");
    expect(client.name).toBe("John Doe Updated");
  });

  it("Should not be able to update a inexistent client", async () => {
    expect(async () => {
      await updateClientProfileUseCase.execute("inexistent-client-id", {
        name: "John Doe Updated",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
