import { inject, injectable } from "tsyringe";

import { Order } from "../../entities/Order";
import { IOrdersRepository } from "../../repositories/IOrdersRepository";

@injectable()
class ListClientOrdersUseCase {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository
  ) {}

  async execute(clientId: string): Promise<Order[]> {
    const orders = await this.ordersRepository.findByClientId(clientId);

    return orders;
  }
}

export { ListClientOrdersUseCase };
