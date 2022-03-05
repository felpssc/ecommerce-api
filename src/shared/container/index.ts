import { container } from "tsyringe";

import { SendEmailVerification } from "../../helpers/sendEmailVerification/implementations/SendEmailVerification";
import { ISendEmailVerification } from "../../helpers/sendEmailVerification/ISendEmailVerification";
import { IAccountVerificationRepository } from "../../modules/accounts/repositories/IAccountVerificationRepository";
import { AccountVerificationRepository } from "../../modules/accounts/repositories/implementations/AccountVerificationRepository";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { MailProvider } from "./MailProvider/implementations/MailProvider";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IAccountVerificationRepository>(
  "AccountVerificationRepository",
  AccountVerificationRepository
);

container.registerInstance<IMailProvider>("MailProvider", new MailProvider());

container.registerSingleton<ISendEmailVerification>(
  "SendEmailVerification",
  SendEmailVerification
);
