import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";
import { IParams } from "../../useCases/listUsers/ListUsersUseCase";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }

  async findAll({
    limit,
    offset,
    email,
    active,
    id,
  }: IParams): Promise<[User[], number]> {
    const filters: IParams = {};

    if (email) {
      filters.email = email;
    }

    if (active) {
      filters.active = active;
    }

    if (id) {
      filters.id = id;
    }

    const clients = await this.repository.findAndCount({
      skip: offset || 0,
      take: limit || 10,
      select: ["id", "email", "created_at", "updated_at"],
      where: filters,
    });

    return clients;
  }

  async create({ email, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ email, password });

    await this.repository.save(user);

    return user;
  }

  async activateUser(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });

    user.active = true;

    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
