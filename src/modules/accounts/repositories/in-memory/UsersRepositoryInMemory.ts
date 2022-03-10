import { User } from "../../entities/User";
import { IParams } from "../../useCases/listUsers/ListUsersUseCase";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  async create({ email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      email,
      password,
    });

    this.users.push(user);

    return user;
  }

  async activateUser(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      user.active = true;
    }

    return user;
  }

  async findAll({ email, active }: IParams): Promise<[User[], number]> {
    let { users } = this;

    if (email) {
      users = users.filter((user) => user.email === email);
    }

    if (active) {
      users = users.filter((user) => user.active === active);
    }

    const total = users.length;

    return [users, total];
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
    }
  }
}

export { UsersRepositoryInMemory };
