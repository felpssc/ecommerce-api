import "dotenv/config";

import { S3 } from "aws-sdk";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { IImagesProductRepository } from "../../../../../modules/products/repositories/IImagesProductRepository";
import { IStorageProvider } from "../IStorageProvider";

@injectable()
class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor(
    @inject("ImagesProductRepository")
    private imagesProductRepository: IImagesProductRepository
  ) {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    });
  }

  async saveFile(files: Express.Multer.File[]): Promise<string[]> {
    // upload files to S3
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const { originalname } = file;

        const Key = `${Date.now()}-${originalname}-${uuidv4()}`;

        await this.client
          .putObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key,
            ACL: "public-read",
            Body: file.buffer,
            ContentType: file.mimetype,
          })
          .promise();

        return Key;
      })
    );

    return uploadedFiles;
  }

  async listProductImages(keys: string[]) {
    const images = await Promise.all(
      keys.map(async (key) => {
        const image = await this.client
          .getObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
          })
          .promise();

        return image;
      })
    );

    return images;
  }
}

export { S3StorageProvider };
