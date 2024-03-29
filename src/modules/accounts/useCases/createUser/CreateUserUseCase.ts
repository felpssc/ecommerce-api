import bcrypt from "bcrypt";
import { inject, injectable } from "tsyringe";

import { createUserSchema } from "../../../../helpers/validators/user/createUser.validator";
import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../entities/User";
import {
  ICreateUserDTO,
  IUsersRepository,
} from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: ICreateUserDTO): Promise<User> {
    const { error } = createUserSchema.validate({ email, password });

    if (error) {
      throw new AppError(error.message);
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
    });

    return user.hidePassword;
  }
}

export { CreateUserUseCase };
