import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ListUsersUseCase } from "./ListUsersUseCase";

let usersRepositoryInMemory: IUsersRepository;
let listUsersUseCase: ListUsersUseCase;

describe("Should be able to list users", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
  });

  it("Should be able to list users", async () => {
    await usersRepositoryInMemory.create({
      email: "test1@email.com",
      password: "12345678",
    });

    await usersRepositoryInMemory.create({
      email: "test2@email.com",
      password: "12345678",
    });

    const users = await listUsersUseCase.execute({});

    expect(users.length).toBe(2);
    expect(users[1]).toBe(2);
    expect(users[0][0].email).toBe("test1@email.com");
  });

  it("Should be able to filter users by active status", async () => {
    await usersRepositoryInMemory.create({
      email: "test1@email.com",
      password: "12345678",
    });

    const user2 = await usersRepositoryInMemory.create({
      email: "test2@email.com",
      password: "12345678",
    });

    const user1Activated = await usersRepositoryInMemory.activateUser(user2.id);

    const users = await listUsersUseCase.execute({ active: true });

    expect(users.length).toBe(2);
    expect(users[0][0].email).toBe("test2@email.com");
    expect(users[0][0].id).toBe(user1Activated.id);
    expect(users[1]).toBe(1);
  });

  it("Should be able to filter users by email", async () => {
    await usersRepositoryInMemory.create({
      email: "test1@email.com",
      password: "12345678",
    });

    const user2 = await usersRepositoryInMemory.create({
      email: "test2@email.com",
      password: "12345678",
    });

    const users = await listUsersUseCase.execute({ email: user2.email });

    expect(users.length).toBe(2);
    expect(users[0][0].email).toBe("test2@email.com");
    expect(users[0][1]).toBeUndefined();
    expect(users[1]).toBe(1);
  });
});
