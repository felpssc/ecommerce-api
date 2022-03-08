import { getRepository, Repository } from "typeorm";

import { Order } from "../../entities/Order";
import { ICreateOrderDTO, IOrdersRepository } from "../IOrdersRepository";

class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

  async create({
    clientId,
    status,
    payment_price,
  }: ICreateOrderDTO): Promise<Order> {
    const order = this.repository.create({
      clientId,
      status,
      payment_price,
    });

    await this.repository.save(order);

    return order;
  }
}

export { OrdersRepository };
