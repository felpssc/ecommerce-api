import { inject, injectable } from "tsyringe";

import { createProductSchema } from "../../../../helpers/validators/product/createProduct.validator";
import { AppError } from "../../../../shared/errors/AppError";
import { Product } from "../../entities/Product";
import {
  ICreateProductDTO,
  IProductsRepository,
} from "../../repositories/IProductsRepository";

@injectable()
class CreateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    name,
    price,
    characteristics,
    code,
  }: ICreateProductDTO): Promise<Product> {
    const { error, value } = createProductSchema.validate({
      name,
      price,
      characteristics,
      code,
    });

    if (error) {
      throw new AppError(error.message);
    }

    const productAlreadyExists = await this.productsRepository.findByCode(code);

    if (productAlreadyExists) {
      throw new AppError("Product already exists");
    }

    const product = await this.productsRepository.create(value);

    return product;
  }
}

export { CreateProductUseCase };
