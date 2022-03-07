import "dotenv/config";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

class MailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    this.client = transporter;
  }

  async sendMail(to: string, subject: string, message: string): Promise<void> {
    await this.client.sendMail({
      to,
      from: '"EcommerceApp" <noreply@ecommerce.app>',
      subject,
      html: message,
    });
  }
}

export { MailProvider };
