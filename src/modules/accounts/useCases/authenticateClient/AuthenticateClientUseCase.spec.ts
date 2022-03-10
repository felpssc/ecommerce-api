import bcrypt from "bcrypt";

import { AppError } from "../../../../shared/errors/AppError";
import { IClientsRepository } from "../../repositories/IClientsRepository";
import { ClientsRepositoryInMemory } from "../../repositories/in-memory/ClientsRepositoryInMemory";
import { AuthenticateClientUseCase } from "./AuthenticateClientUseCase";

let clientsRepositoryInMemory: IClientsRepository;
let authenticateClientUseCase: AuthenticateClientUseCase;

describe("Authenticate client", () => {
  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    authenticateClientUseCase = new AuthenticateClientUseCase(
      clientsRepositoryInMemory
    );
  });

  it("Should be able to authenticate a client", async () => {
    const createdClient = await clientsRepositoryInMemory.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: await bcrypt.hash("123456789", 10),
      phone: "11999999999",
    });

    await clientsRepositoryInMemory.activateClient(createdClient.id);

    const token = await authenticateClientUseCase.execute({
      email: createdClient.email,
      password: "123456789",
    });

    expect(token).toBeTruthy();
    expect(token).toHaveProperty("token");
  });

  it("Should not be able to authenticate a client with invalid credentials", async () => {
    const createdClient = await clientsRepositoryInMemory.create({
      name: "John Doe",
      email: "johndoe",
      password: await bcrypt.hash("123456789", 10),
      phone: "11999999999",
    });

    await clientsRepositoryInMemory.activateClient(createdClient.id);

    expect(async () => {
      await authenticateClientUseCase.execute({
        email: createdClient.email,
        password: "some-invalid-password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
