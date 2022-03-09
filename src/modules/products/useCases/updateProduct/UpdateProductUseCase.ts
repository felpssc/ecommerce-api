import { inject, injectable } from "tsyringe";

import { updateProductSchema } from "../../../../helpers/validators/product/updateProduct.validator";
import { AppError } from "../../../../shared/errors/AppError";
import {
  IProductsRepository,
  IUpdateProductDTO,
} from "../../repositories/IProductsRepository";

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute(
    id: string,
    { name, price, characteristics, code }: IUpdateProductDTO
  ) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found");
    }

    const { error, value } = updateProductSchema.validate({
      name,
      price,
      characteristics,
      code,
    });

    if (error) {
      throw new AppError(error.message);
    }

    const updatedProduct = await this.productsRepository.update(
      product.id,
      value
    );

    return updatedProduct;
  }
}

export { UpdateProductUseCase };
