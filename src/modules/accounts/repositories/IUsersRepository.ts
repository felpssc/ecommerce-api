import { User } from "../entities/User";

interface ICreateUserDTO {
  email: string;
  password: string;
}

interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create({ email, password }: ICreateUserDTO): Promise<User>;
  activateUser(id: string): Promise<User | undefined>;
}

export { IUsersRepository, ICreateUserDTO };
