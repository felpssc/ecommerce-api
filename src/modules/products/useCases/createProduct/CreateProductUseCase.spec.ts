import { AppError } from "../../../../shared/errors/AppError";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/ProductsRepositoryInMemory";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { CreateProductUseCase } from "./CreateProductUseCase";

let productsRepository: IProductsRepository;
let createProductUseCase: CreateProductUseCase;

describe("Create product", () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryInMemory();
    createProductUseCase = new CreateProductUseCase(productsRepository);
  });

  it("Should be able to create a product", async () => {
    const product = await createProductUseCase.execute({
      name: "Product 1",
      price: 10,
      code: "CODE-1",
      characteristics: "Characteristics 1",
    });

    expect(product).toBeDefined();
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(10);
    expect(product.code).toBe("CODE-1");
  });

  it("Should not be able to create a product with same code", async () => {
    await createProductUseCase.execute({
      name: "Product 1",
      price: 10,
      code: "CODE-1",
      characteristics: "Characteristics 1",
    });

    await expect(
      createProductUseCase.execute({
        name: "Product 2",
        price: 20,
        code: "CODE-1",
        characteristics: "Characteristics 2",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
