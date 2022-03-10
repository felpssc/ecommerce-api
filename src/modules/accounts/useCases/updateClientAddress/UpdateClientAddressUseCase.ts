import { inject, injectable } from "tsyringe";

import { updateAddressSchema } from "../../../../helpers/validators/address/updateAddress.validator";
import { AppError } from "../../../../shared/errors/AppError";
import {
  IAddressesRepository,
  IUpdateAddressDTO,
} from "../../repositories/IAddressesRepository";

@injectable()
class UpdateClientAddressUseCase {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  async execute(
    id: string,
    { street, number, district, cep }: IUpdateAddressDTO
  ) {
    const { error, value } = updateAddressSchema.validate({
      street,
      number,
      district,
      cep,
    });

    if (error) {
      throw new AppError(error.message);
    }

    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new AppError("Address not found");
    }

    const updatedAddress = await this.addressesRepository.update(id, value);

    return updatedAddress;
  }
}

export { UpdateClientAddressUseCase };
