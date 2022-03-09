import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IImagesProductRepository } from "../../repositories/IImagesProductRepository";

@injectable()
class DeleteProductImageUseCase {
  constructor(
    @inject("ImagesProductRepository")
    private imagesProductRepository: IImagesProductRepository,
    @inject("S3StorageProvider")
    private s3StorageProvider: IStorageProvider
  ) {}

  async execute(id: string): Promise<void> {
    const image = await this.imagesProductRepository.findById(id);

    if (!image) {
      throw new AppError("Image not found");
    }

    await this.imagesProductRepository.delete(id);

    await this.s3StorageProvider.deleteFile(image.file);
  }
}

export { DeleteProductImageUseCase };
