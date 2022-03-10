import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let usersRepositoryInMemory: IUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show user profile", () => {
  beforeAll(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    showUserProfileUseCase = new ShowUserProfileUseCase(
      usersRepositoryInMemory
    );
  });

  it("Should be able to show user profile", async () => {
    const user = await usersRepositoryInMemory.create({
      email: "user@email.com",
      password: "12345678",
    });

    const userProfile = await showUserProfileUseCase.execute(user.id);

    expect(userProfile).toHaveProperty("id");
    expect(userProfile).toHaveProperty("email");
  });

  it("Should not be able to show profile of an inexistent user", async () => {
    const userProfile = await showUserProfileUseCase.execute("inexistent-user");

    expect(userProfile).toBeUndefined();
  });
});
