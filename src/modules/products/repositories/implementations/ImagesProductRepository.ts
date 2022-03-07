import { getRepository, Repository } from "typeorm";

import { ImageProduct } from "../../entities/ImageProduct";
import {
  ICreateImagesProductDTO,
  IImagesProductRepository,
} from "../IImagesProductRepository";

class ImagesProductRepository implements IImagesProductRepository {
  private repository: Repository<ImageProduct>;

  constructor() {
    this.repository = getRepository(ImageProduct);
  }

  async create({ file, productId }: ICreateImagesProductDTO): Promise<void> {
    const image = this.repository.create({
      file,
      productId,
    });

    await this.repository.save(image);
  }

  async findByProductId(productId: string): Promise<string[]> {
    const keys = await this.repository.find({
      where: { productId },
    });

    return keys.map((key) => key.file);
  }
}

export { ImagesProductRepository };
