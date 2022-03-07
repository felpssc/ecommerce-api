import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IImagesProductRepository } from "../../repositories/IImagesProductRepository";
import { IProductsRepository } from "../../repositories/IProductsRepository";

interface IRequest {
  files: Express.Multer.File[];
  productId: string;
}

@injectable()
class UploadProductImageUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("ImagesProductRepository")
    private imagesProductRepository: IImagesProductRepository,
    @inject("S3StorageProvider")
    private s3StorageProvider: IStorageProvider
  ) {}

  public async execute({ files, productId }: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new AppError("Product not found");
    }

    const images = await this.s3StorageProvider.saveFile(files);

    await Promise.all(
      images.map(async (image) => {
        await this.imagesProductRepository.create({
          file: image,
          productId,
        });
      })
    );
  }
}

export { UploadProductImageUseCase };
