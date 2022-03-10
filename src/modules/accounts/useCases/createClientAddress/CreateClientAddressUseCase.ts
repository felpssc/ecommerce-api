import { inject, injectable } from "tsyringe";

import { createAddressSchema } from "../../../../helpers/validators/address/createAddress.validator";
import { AppError } from "../../../../shared/errors/AppError";
import {
  IAddressesRepository,
  ICreateAddressDTO,
} from "../../repositories/IAddressesRepository";

@injectable()
class CreateClientAddressUseCase {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  async execute({
    street,
    district,
    number,
    cep,
    clientId,
  }: ICreateAddressDTO) {
    const { error, value } = createAddressSchema.validate({
      street,
      district,
      number,
      cep,
    });

    if (error) {
      throw new AppError(error.message);
    }

    const address = await this.addressesRepository.create({
      ...value,
      clientId,
    });

    return address;
  }
}

export { CreateClientAddressUseCase };
