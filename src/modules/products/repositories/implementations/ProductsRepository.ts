import {
  getRepository,
  Repository,
  MoreThanOrEqual,
  LessThanOrEqual,
  Between,
  Raw,
} from "typeorm";

import { Product } from "../../entities/Product";
import {
  ICreateProductDTO,
  IParams,
  IProductsRepository,
} from "../IProductsRepository";

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  async create({
    name,
    price,
    code,
    characteristics,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      name,
      price,
      code,
      characteristics,
    });

    await this.repository.save(product);

    return product;
  }

  async findAll({
    limit,
    offset,
    name,
    minPrice,
    maxPrice,
    code,
    id,
  }: IParams): Promise<[Product[], number]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filters: any = {};

    if (name) filters.name = Raw((alias) => `${alias} ILIKE '%${name}%'`);

    if (minPrice) filters.price = MoreThanOrEqual(minPrice);

    if (maxPrice) filters.price = LessThanOrEqual(maxPrice);

    if (minPrice && maxPrice) filters.price = Between(minPrice, maxPrice);

    if (code) filters.code = code;

    if (id) filters.id = id;

    const products = await this.repository.findAndCount({
      skip: offset || 0,
      take: limit || 10,
      where: filters,
      relations: ["images"],
    });

    return products;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.repository.findOne({ where: { id } });

    return product;
  }

  async findByCode(code: string): Promise<Product> {
    const product = await this.repository.findOne({ where: { code } });

    return product;
  }
}

export { ProductsRepository };
