import { Product } from "../../entities/Product";
import {
  ICreateProductDTO,
  IParams,
  IProductsRepository,
  IUpdateProductDTO,
} from "../IProductsRepository";

class ProductsRepositoryInMemory implements IProductsRepository {
  private products: Product[] = [];

  async create({
    name,
    price,
    code,
    characteristics,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      name,
      price,
      code,
      characteristics,
    });

    this.products.push(product);

    return product;
  }

  async findAll({
    name,
    minPrice,
    maxPrice,
    code,
    id,
  }: IParams): Promise<[Product[], number]> {
    let { products } = this;

    if (name) {
      products = products.filter((product) => product.name === name);
    }

    if (minPrice) {
      products = products.filter((product) => product.price >= minPrice);
    }

    if (maxPrice) {
      products = products.filter((product) => product.price <= maxPrice);
    }

    if (code) {
      products = products.filter((product) => product.code === code);
    }

    if (id) {
      products = products.filter((product) => product.id === id);
    }

    return [products, products.length];
  }

  async findById(id: string): Promise<Product> {
    const product = this.products.find((product) => product.id === id);

    return product;
  }

  async findByCode(code: string): Promise<Product> {
    const product = this.products.find((product) => product.code === code);

    return product;
  }

  async update(
    id: string,
    { name, price, characteristics, code }: IUpdateProductDTO
  ): Promise<Product> {
    const product = this.products.find((product) => product.id === id);

    if (name) {
      product.name = name;
    }

    if (price) {
      product.price = price;
    }

    if (characteristics) {
      product.characteristics = characteristics;
    }

    if (code) {
      product.code = code;
    }

    return product;
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter((product) => product.id !== id);
  }
}

export { ProductsRepositoryInMemory };
