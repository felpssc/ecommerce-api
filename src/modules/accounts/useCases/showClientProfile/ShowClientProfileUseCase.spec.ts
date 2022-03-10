import { IClientsRepository } from "../../repositories/IClientsRepository";
import { ClientsRepositoryInMemory } from "../../repositories/in-memory/ClientsRepositoryInMemory";
import { ShowClientProfileUseCase } from "./ShowClientProfileUseCase";

let clientsRepositoryInMemory: IClientsRepository;
let showClientProfileUseCase: ShowClientProfileUseCase;

describe("Show client profile", () => {
  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    showClientProfileUseCase = new ShowClientProfileUseCase(
      clientsRepositoryInMemory
    );
  });

  it("Should be able to show a client profile", async () => {
    const createdClient = await clientsRepositoryInMemory.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456789",
      phone: "11999999999",
    });

    const client = await showClientProfileUseCase.execute(createdClient.id);

    expect(client).toBeTruthy();
    expect(client).toHaveProperty("id");
  });
});
