import { getRepository, Repository } from "typeorm";

import { Product } from "../../entities/Product";
import { ICreateProductDTO, IProductsRepository } from "../IProductsRepository";

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

  async findAll(): Promise<Product[]> {
    const products = await this.repository.find();

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
