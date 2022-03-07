interface ICreateImagesProductDTO {
  file: string;
  productId: string;
}

interface IImagesProductRepository {
  create({ file, productId }: ICreateImagesProductDTO): Promise<void>;
  findByProductId(product_id: string): Promise<string[]>;
}

export { IImagesProductRepository, ICreateImagesProductDTO };
