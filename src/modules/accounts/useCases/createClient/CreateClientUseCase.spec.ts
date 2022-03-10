import { AppError } from "../../../../shared/errors/AppError";
import { IClientsRepository } from "../../repositories/IClientsRepository";
import { ClientsRepositoryInMemory } from "../../repositories/in-memory/ClientsRepositoryInMemory";
import { CreateClientUseCase } from "./CreateClientUseCase";

let clientsRepositoryInMemory: IClientsRepository;
let createClientUseCase: CreateClientUseCase;

describe("Create client", () => {
  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    createClientUseCase = new CreateClientUseCase(clientsRepositoryInMemory);
  });

  it("Should be able to create a new client", async () => {
    const user = await createClientUseCase.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456789",
      phone: "11999999999",
    });

    expect(user).toBeTruthy();
    expect(user).toHaveProperty("id");
  });

  it("Should not be able to create a new client with same email", async () => {
    expect(async () => {
      await createClientUseCase.execute({
        name: "John Doe",
        email: "johndoe@email.com",
        password: "123456789",
        phone: "11999999999",
      });

      await createClientUseCase.execute({
        name: "John Doe",
        email: "johndoe@email.com",
        password: "123456789",
        phone: "11999999999",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
