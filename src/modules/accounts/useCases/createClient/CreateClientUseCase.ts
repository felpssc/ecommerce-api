import bcrypt from "bcrypt";
import { container, inject, injectable } from "tsyringe";

import { SendEmailVerification } from "../../../../helpers/sendEmailVerification/implementations/SendEmailVerification";
import { createClientSchema } from "../../../../helpers/validators/client/createClient.validator";
import { AppError } from "../../../../shared/errors/AppError";
import { Client } from "../../entities/Client";
import { IAddressesRepository } from "../../repositories/IAddressesRepository";
import { IClientsRepository } from "../../repositories/IClientsRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

@injectable()
class CreateClientUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository,
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  async execute({ name, email, password, phone }: IRequest): Promise<Client> {
    const { error, value } = createClientSchema.validate({
      name,
      email,
      password,
      phone,
    });

    if (error) {
      throw new AppError(error.message);
    }

    const clientAlreadyExists = await this.clientsRepository.findByEmail(email);

    if (clientAlreadyExists) {
      throw new AppError("Client already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await this.clientsRepository.create({
      ...value,
      password: hashedPassword,
    });

    const sendEmailVerification = container.resolve(SendEmailVerification);

    await sendEmailVerification.execute({
      email,
      client_id: client.id,
    });

    return client.hidePassword;
  }
}

export { CreateClientUseCase };
