import { AppError } from "../../../../shared/errors/AppError";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/ProductsRepositoryInMemory";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

let productsRepository: IProductsRepository;
let deleteProductUseCase: DeleteProductUseCase;

describe("Delete product", () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryInMemory();
    deleteProductUseCase = new DeleteProductUseCase(productsRepository);
  });

  it("Should be able to delete product", async () => {
    const product = await productsRepository.create({
      name: "Product 1",
      characteristics: "Product 1 description",
      price: 100,
      code: "CODE-1",
    });

    await deleteProductUseCase.execute(product.id);

    const productDeleted = await productsRepository.findById(product.id);

    expect(productDeleted).toBe(undefined);
  });

  it("Should not be able to delete an inexistent product", async () => {
    await expect(async () => {
      await deleteProductUseCase.execute("product-id");
    }).rejects.toBeInstanceOf(AppError);
  });
});
