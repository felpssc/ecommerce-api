interface IStorageProvider {
  saveFile(files: Express.Multer.File[]): Promise<string[]>;
  deleteFile(file: string): Promise<void>;
}

export { IStorageProvider };
