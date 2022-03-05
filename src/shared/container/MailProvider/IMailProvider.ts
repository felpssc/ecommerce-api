interface IMailProvider {
  sendMail(to: string, subject: string, message: string): Promise<void>;
}

export { IMailProvider };
