import "dotenv/config";
import { inject, injectable } from "tsyringe";

import { Product } from "../../entities/Product";
import {
  IParams,
  IProductsRepository,
} from "../../repositories/IProductsRepository";

@injectable()
class ListProductsUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    limit,
    offset,
    name,
    code,
    minPrice,
    maxPrice,
    id,
  }: IParams): Promise<[Product[], number]> {
    const products = await this.productsRepository.findAll({
      limit,
      offset,
      name,
      code,
      minPrice,
      maxPrice,
      id,
    });

    await Promise.all(
      products[0].map(async (product) => {
        product.images.forEach((image) => {
          const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${image.file}`;

          Object.assign(image, {
            url: imageUrl,
          });
        });

        return product;
      })
    );

    return products;
  }
}

export { ListProductsUseCase };
