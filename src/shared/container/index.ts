import { container } from "tsyringe";

import { SendEmailVerification } from "../../helpers/sendEmailVerification/implementations/SendEmailVerification";
import { ISendEmailVerification } from "../../helpers/sendEmailVerification/ISendEmailVerification";
import { IAccountVerificationRepository } from "../../modules/accounts/repositories/IAccountVerificationRepository";
import { IAddressesRepository } from "../../modules/accounts/repositories/IAddressesRepository";
import { IClientsRepository } from "../../modules/accounts/repositories/IClientsRepository";
import { AccountVerificationRepository } from "../../modules/accounts/repositories/implementations/AccountVerificationRepository";
import { AddressesRepository } from "../../modules/accounts/repositories/implementations/AddressesRepository";
import { ClientsRepository } from "../../modules/accounts/repositories/implementations/ClientsRepository";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { MailProvider } from "./MailProvider/implementations/MailProvider";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IClientsRepository>(
  "ClientsRepository",
  ClientsRepository
);

container.registerSingleton<IAddressesRepository>(
  "AddressesRepository",
  AddressesRepository
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
