import { inject, injectable } from "tsyringe";

import { updateOrderSchema } from "../../../../helpers/validators/order/updateSatus.validator";
import { AppError } from "../../../../shared/errors/AppError";
import { Order } from "../../entities/Order";
import { IOrdersRepository } from "../../repositories/IOrdersRepository";

@injectable()
class UpdateOrderStatusUseCase {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository
  ) {}

  async execute(id: string, status: "pending" | "delivered"): Promise<Order> {
    const { error } = updateOrderSchema.validate({ status });

    if (error) throw new AppError(error.message);

    const order = await this.ordersRepository.findById(id);

    if (!order) throw new AppError("Order not found");

    order.status = status;

    await this.ordersRepository.updateStatus(id, status);

    return order;
  }
}

export { UpdateOrderStatusUseCase };
