import { ImageProduct } from "../entities/ImageProduct";

interface ICreateImagesProductDTO {
  file: string;
  productId: string;
}

interface IImagesProductRepository {
  create({ file, productId }: ICreateImagesProductDTO): Promise<void>;
  findByProductId(product_id: string): Promise<string[]>;
  findById(id: string): Promise<ImageProduct>;
  delete(id: string): Promise<void>;
}

export { IImagesProductRepository, ICreateImagesProductDTO };
