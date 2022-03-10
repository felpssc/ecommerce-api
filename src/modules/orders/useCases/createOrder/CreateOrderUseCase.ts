import { container, inject, injectable } from "tsyringe";

import { CheckIfProductsExists } from "../../../../helpers/checkIfProductsExists/implementations/CheckIfProductsExists";
import { GetPaymentPrice } from "../../../../helpers/getPaymentPrice/implementations/GetPaymentPrice";
import { IProductsRepository } from "../../../products/repositories/IProductsRepository";
import { Order } from "../../entities/Order";
import { IOrdersRepository } from "../../repositories/IOrdersRepository";
import {
  IProducts,
  IProductsOrderRepository,
} from "../../repositories/IProductsOrderRepository";

interface IRequest {
  clientId: string;
  items: IProducts[];
}

@injectable()
class CreateOrderUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository,
    @inject("ProductsOrderRepository")
    private productsOrderRepository: IProductsOrderRepository
  ) {}

  public async execute({ items, clientId }: IRequest): Promise<Order> {
    const checkIfProductsExists = container.resolve(CheckIfProductsExists);

    await checkIfProductsExists.execute({ items });

    const getPaymentPrice = container.resolve(GetPaymentPrice);

    const payment_price = await getPaymentPrice.execute({ items });

    const order = await this.ordersRepository.create({
      clientId,
      payment_price,
      status: "pending",
    });

    await this.productsOrderRepository.create({
      items,
      orderId: order.id,
    });

    return order;
  }
}

export { CreateOrderUseCase };
