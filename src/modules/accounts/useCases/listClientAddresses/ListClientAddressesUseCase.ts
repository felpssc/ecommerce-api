import { inject, injectable } from "tsyringe";

import { IAddressesRepository } from "../../repositories/IAddressesRepository";

@injectable()
class ListClientAddressesUseCase {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  async execute(clientId: string) {
    const addresses = await this.addressesRepository.findByClientId(clientId);

    return addresses;
  }
}

export { ListClientAddressesUseCase };
