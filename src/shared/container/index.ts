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
import { ProductsRepository } from "../../modules/products/repositories/implementations/ProductsRepository";
import { IProductsRepository } from "../../modules/products/repositories/IProductsRepository";
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

container.registerSingleton<ISendEmailVerification>(
  "SendEmailVerification",
  SendEmailVerification
);

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);

container.registerInstance<IMailProvider>("MailProvider", new MailProvider());
