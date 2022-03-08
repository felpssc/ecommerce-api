import { Product } from "../entities/Product";

interface ICreateProductDTO {
  name: string;
  price: number;
  code: string;
  characteristics: string;
}

interface IParams {
  limit?: number | 10;
  offset?: number | 0;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  code?: string;
  id?: string;
}

interface IProductsRepository {
  create({
    name,
    price,
    code,
    characteristics,
  }: ICreateProductDTO): Promise<Product>;
  findAll({
    limit,
    offset,
    name,
    minPrice,
    maxPrice,
    code,
    id,
  }: IParams): Promise<[Product[], number]>;
  findById(id: string): Promise<Product | undefined>;
  findByCode(code: string): Promise<Product | undefined>;
}

export { IProductsRepository, ICreateProductDTO, IParams };
