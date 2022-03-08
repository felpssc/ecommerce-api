import { IProducts } from "../../modules/orders/repositories/IProductsOrderRepository";

interface IItems {
  items: IProducts[];
}

interface ICheckIfProductsExists {
  execute(items: IItems): Promise<void>;
}

export { ICheckIfProductsExists, IItems };
