import { User } from "../entities/User";
import { IParams } from "../useCases/listUsers/ListUsersUseCase";

interface ICreateUserDTO {
  email: string;
  password: string;
}

interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create({ email, password }: ICreateUserDTO): Promise<User>;
  activateUser(id: string): Promise<User | undefined>;
  findAll({ limit, offset, email, active }: IParams): Promise<[User[], number]>;
  delete(id: string): Promise<void>;
}

export { IUsersRepository, ICreateUserDTO };
