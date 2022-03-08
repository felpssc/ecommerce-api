import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IParams {
  limit?: number | 10;
  offset?: number | 0;
  active?: boolean;
  email?: string;
  id?: string;
}

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    limit,
    offset,
    active,
    email,
    id,
  }: IParams): Promise<[User[], number]> {
    const users = await this.usersRepository.findAll({
      limit,
      offset,
      email,
      active,
      id,
    });

    return users;
  }
}

export { ListUsersUseCase, IParams };
