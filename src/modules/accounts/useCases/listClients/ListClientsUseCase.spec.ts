import { IClientsRepository } from "../../repositories/IClientsRepository";
import { ClientsRepositoryInMemory } from "../../repositories/in-memory/ClientsRepositoryInMemory";
import { ListClientsUseCase } from "./ListClientsUseCase";

let clientsRepository: IClientsRepository;
let listClientsUseCase: ListClientsUseCase;

describe("List Clients", () => {
  beforeEach(() => {
    clientsRepository = new ClientsRepositoryInMemory();
    listClientsUseCase = new ListClientsUseCase(clientsRepository);
  });

  it("should return all clients", async () => {
    await clientsRepository.create({
      name: "Client 1",
      email: "client1@email.com",
      password: "123456",
      phone: "12345678910",
    });

    await clientsRepository.create({
      name: "Client 2",
      email: "client2@email.com",
      password: "123456",
      phone: "12345678910",
    });

    const clients = await listClientsUseCase.execute({});

    expect(clients.length).toBe(2);
    expect(clients[1]).toBe(2);
    expect(clients[0][1].name).toBe("Client 2");
  });

  it("Should be able to filter clients by active status", async () => {
    await clientsRepository.create({
      name: "Client 1",
      email: "client1@email.com",
      password: "123456",
      phone: "12345678910",
    });

    const client2 = await clientsRepository.create({
      name: "Client 2",
      email: "client2@email.com",
      password: "123456",
      phone: "12345678910",
    });

    await clientsRepository.activateClient(client2.id);

    const clients = await listClientsUseCase.execute({
      active: true,
    });

    expect(clients[0].length).toBe(1);
    expect(clients[0][0].name).toBe("Client 2");
    expect(clients[1]).toBe(1);
  });
});
