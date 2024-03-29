import { inject, injectable } from "tsyringe";

import { Order } from "../../entities/Order";
import {
  IOrdersRepository,
  IParams,
} from "../../repositories/IOrdersRepository";

@injectable()
class ListOrdersUseCase {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository
  ) {}

  public async execute({
    id,
    startDate,
    endDate,
    minPaymentPrice,
    maxPaymentPrice,
    clientId,
    status,
    productId,
    limit,
    offset,
  }: IParams): Promise<[Order[], number]> {
    const orders = await this.ordersRepository.findAll({
      id,
      startDate,
      endDate,
      minPaymentPrice,
      maxPaymentPrice,
      clientId,
      status,
      productId,
      limit,
      offset,
    });

    return orders;
  }
}

export { ListOrdersUseCase };
