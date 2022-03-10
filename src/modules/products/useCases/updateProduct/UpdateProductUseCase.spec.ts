import { AppError } from "../../../../shared/errors/AppError";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/ProductsRepositoryInMemory";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

let productsRepository: IProductsRepository;
let updateProductUseCase: UpdateProductUseCase;

describe("Update product", () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryInMemory();
    updateProductUseCase = new UpdateProductUseCase(productsRepository);
  });

  it("Should be able to update product", async () => {
    const product = await productsRepository.create({
      name: "Product 1",
      characteristics: "Product 1 description",
      price: 100,
      code: "CODE-1",
    });

    const updatedProduct = {
      name: "Product 2",
      characteristics: "Product 2 description",
      price: 100,
      code: "CODE-2",
    };

    await updateProductUseCase.execute(product.id, updatedProduct);

    const productUpdated = await productsRepository.findById(product.id);

    expect(productUpdated.name).toBe("Product 2");
    expect(productUpdated.characteristics).toBe("Product 2 description");
    expect(productUpdated.code).toBe("CODE-2");
  });

  it("Should not be able to update an inexistent product", async () => {
    await expect(async () => {
      await updateProductUseCase.execute("product-id", { name: "Product 1" });
    }).rejects.toBeInstanceOf(AppError);
  });
});
