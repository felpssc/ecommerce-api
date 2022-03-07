import { Product } from "../entities/Product";

interface ICreateProductDTO {
  name: string;
  price: number;
  code: string;
  characteristics: string;
}

interface IProductsRepository {
  create({
    name,
    price,
    code,
    characteristics,
  }: ICreateProductDTO): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByCode(code: string): Promise<Product | undefined>;
}

export { IProductsRepository, ICreateProductDTO };
