import bcrypt from "bcrypt";

import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: IUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate user", () => {
  beforeAll(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );

    const user = await usersRepositoryInMemory.create({
      email: "user@email.com",
      password: bcrypt.hashSync("password", 10),
    });

    user.active = true;
  });

  it("Should be able to authenticate user", async () => {
    const token = await authenticateUserUseCase.execute({
      email: "user@email.com",
      password: "password",
    });

    expect(token).toBeTruthy();
    expect(token).toHaveProperty("token");
  });

  it("Should be not able to authenticate an user if incorrect credentials", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "user@email.com",
        password: "someOtherPassword",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
