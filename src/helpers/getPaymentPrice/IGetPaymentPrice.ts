import { IProducts } from "../../modules/orders/repositories/IProductsOrderRepository";

interface IGetPaymentPriceDTO {
  items: IProducts[];
}

interface IGetPaymentPrice {
  execute({ items }: IGetPaymentPriceDTO): Promise<number>;
}

export { IGetPaymentPriceDTO, IGetPaymentPrice };
