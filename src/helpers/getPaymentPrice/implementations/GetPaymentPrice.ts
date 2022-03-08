import { inject, injectable } from "tsyringe";

import { IProductsRepository } from "../../../modules/products/repositories/IProductsRepository";
import { IGetPaymentPriceDTO } from "../IGetPaymentPrice";

@injectable()
class GetPaymentPrice {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  public async execute({ items }: IGetPaymentPriceDTO): Promise<number> {
    const prices = await Promise.all(
      items.map(async (item) => {
        const product = await this.productsRepository.findById(item.productId);

        const price = product.price * item.quantity;

        return price;
      })
    );

    const payment_price = prices.reduce((acc, price) => {
      return acc + price;
    });

    return payment_price;
  }
}

export { GetPaymentPrice };
