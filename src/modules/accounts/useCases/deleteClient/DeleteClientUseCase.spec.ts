import { IClientsRepository } from "../../repositories/IClientsRepository";
import { ClientsRepositoryInMemory } from "../../repositories/in-memory/ClientsRepositoryInMemory";
import { DeleteClientUseCase } from "./DeleteClientUseCase";

let clientsRepositoryInMemory: IClientsRepository;
let deleteClientUseCase: DeleteClientUseCase;

describe("Delete client", () => {
  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    deleteClientUseCase = new DeleteClientUseCase(clientsRepositoryInMemory);
  });

  it("Should be able to delete a client", async () => {
    const createdClient = await clientsRepositoryInMemory.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "987654321",
      phone: "11999999999",
    });

    await clientsRepositoryInMemory.activateClient(createdClient.id);

    await deleteClientUseCase.execute(createdClient.id);

    const client = await clientsRepositoryInMemory.findById(createdClient.id);

    expect(client).toBeFalsy();
  });
});
