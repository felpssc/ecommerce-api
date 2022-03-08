import { getRepository, Repository } from "typeorm";

import { ProductOrder } from "../../entities/ProductOrder";
import {
  ICreateProductsOrderDTO,
  IProductsOrderRepository,
} from "../IProductsOrderRepository";

class ProductsOrderRepository implements IProductsOrderRepository {
  private repository: Repository<ProductOrder>;

  constructor() {
    this.repository = getRepository(ProductOrder);
  }

  async create({ items, orderId }: ICreateProductsOrderDTO): Promise<void> {
    const products = items.map((item) => {
      return this.repository.create({
        orderId,
        productId: item.productId,
        quantity: item.quantity,
      });
    });

    await this.repository.save(products);
  }
}

export { ProductsOrderRepository };
