interface IStorageProvider {
  saveFile(files: Express.Multer.File[]): Promise<string[]>;
}

export { IStorageProvider };
