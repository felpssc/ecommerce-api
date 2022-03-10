import "dotenv/config";
import { injectable, inject, container } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { IAccountVerificationRepository } from "../../../modules/accounts/repositories/IAccountVerificationRepository";
import { IMailProvider } from "../../../shared/container/providers/MailProvider/IMailProvider";
import { MailProvider } from "../../../shared/container/providers/MailProvider/implementations/MailProvider";
import {
  ISendEmailVerification,
  ISendEmailVerificationDTO,
} from "../ISendEmailVerification";

@injectable()
class SendEmailVerification implements ISendEmailVerification {
  code: string;
  message: string;
  subject: string;

  private mailProvider: IMailProvider;

  constructor(
    @inject("AccountVerificationRepository")
    private accountVerificationRepository: IAccountVerificationRepository
  ) {
    this.mailProvider = container.resolve(MailProvider);

    this.code = uuidv4();

    this.subject = "Confirme seu e-mail";

    this.message = `<span>Olá, seja bem vindo ao EcommerceApp. 
    Para verificar seu e-mail, clique <a target="_blank" href="${process.env.VERIFY_EMAIL_URL_DEV}${this.code}">aqui</a>.</span>`;
  }

  async execute({
    email,
    client_id,
    user_id,
  }: ISendEmailVerificationDTO): Promise<void> {
    await this.accountVerificationRepository.create({
      user_id,
      client_id,
      code: this.code,
    });

    await this.mailProvider.sendMail(email, this.subject, this.message);
  }
}

export { SendEmailVerification };
