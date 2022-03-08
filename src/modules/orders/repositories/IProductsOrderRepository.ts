interface IProducts {
  productId: string;
  quantity: number;
}

interface ICreateProductsOrderDTO {
  orderId: string;
  items: IProducts[];
}

interface IProductsOrderRepository {
  create({ items }: ICreateProductsOrderDTO): Promise<void>;
}

export { ICreateProductsOrderDTO, IProductsOrderRepository, IProducts };
