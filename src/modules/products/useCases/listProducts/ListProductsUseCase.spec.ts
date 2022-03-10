import { ProductsRepositoryInMemory } from "../../repositories/in-memory/ProductsRepositoryInMemory";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { ListProductsUseCase } from "./ListProductsUseCase";

let productsRepository: IProductsRepository;
let listProductsUseCase: ListProductsUseCase;

describe("List products", () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryInMemory();
    listProductsUseCase = new ListProductsUseCase(productsRepository);
  });

  it("Should be able to list all products", async () => {
    const product1 = await productsRepository.create({
      name: "Product 1",
      price: 10,
      code: "CODE-1",
      characteristics: "Characteristics 1",
    });

    const product2 = await productsRepository.create({
      name: "Product 2",
      price: 20,
      code: "CODE-2",
      characteristics: "Characteristics 2",
    });

    product1.images = [];
    product2.images = [];

    const products = await listProductsUseCase.execute({});

    expect(products).toBeDefined();
    expect(products.length).toBe(2);
    expect(products[0][0]).toEqual(product1);
    expect(products[0][1]).toEqual(product2);
  });

  it("Should be able to list products by name", async () => {
    const product1 = await productsRepository.create({
      name: "Product 1",
      price: 10,
      code: "CODE-1",
      characteristics: "Characteristics 1",
    });

    const product2 = await productsRepository.create({
      name: "Product 2",
      price: 20,
      code: "CODE-2",
      characteristics: "Characteristics 2",
    });

    product1.images = [];
    product2.images = [];

    const products = await listProductsUseCase.execute({
      name: "Product 1",
    });

    expect(products).toBeDefined();
    expect(products.length).toBe(2);
    expect(products[0][0]).toEqual(product1);
    expect(products[0][1]).toBeUndefined();
    expect(products[1]).toBe(1);
  });
});
