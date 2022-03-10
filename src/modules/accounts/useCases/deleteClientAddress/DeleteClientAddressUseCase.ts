import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IAddressesRepository } from "../../repositories/IAddressesRepository";

@injectable()
class DeleteClientAddressUseCase {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  async execute(id: string) {
    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new AppError("Address not found");
    }

    await this.addressesRepository.delete(id);

    return address;
  }
}

export { DeleteClientAddressUseCase };
