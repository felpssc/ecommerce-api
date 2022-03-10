import { inject, injectable } from "tsyringe";

import { IProductsRepository } from "../../../modules/products/repositories/IProductsRepository";
import { AppError } from "../../../shared/errors/AppError";
import { ICheckIfProductsExists, IItems } from "../ICheckIfProductsExists";

@injectable()
class CheckIfProductsExists implements ICheckIfProductsExists {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({ items }: IItems): Promise<void> {
    await Promise.all(
      items.map(async (item) => {
        const product = await this.productsRepository.findById(item.productId);

        if (!product) {
          const message = `Product not found: ${item.productId}`;
          throw new AppError(message);
        }
      })
    );
  }
}

export { CheckIfProductsExists };
