import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: IUsersRepository;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      email: "user1@email.com",
      password: "12345678",
    });

    expect(user).toBeTruthy();
    expect(user.id).toBeTruthy();
    expect(user.email).toBe("user1@email.com");
  });

  it("Should not be able to create a new user with an existing email", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        email: "user2@email.com",
        password: "12345678",
      });

      await createUserUseCase.execute({
        email: "user2@email.com",
        password: "12345678",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
