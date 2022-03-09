import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class DeleteProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute(id: string) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found");
    }

    await this.productsRepository.delete(product.id);
  }
}

export { DeleteProductUseCase };
