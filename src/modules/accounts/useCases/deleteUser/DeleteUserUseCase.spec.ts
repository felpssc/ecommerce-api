import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

let usersRepositoryInMemory: IUsersRepository;
let deleteUserUseCase: DeleteUserUseCase;

describe("Delete a user", () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    deleteUserUseCase = new DeleteUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to delete a user", async () => {
    const user = await usersRepositoryInMemory.create({
      email: "testuser@email.com",
      password: "12345678",
    });

    await deleteUserUseCase.execute(user.id);

    const deletedUser = await usersRepositoryInMemory.findById(user.id);

    expect(deletedUser).toBeFalsy();
    expect(deletedUser?.id).toBe(undefined);
  });
});
