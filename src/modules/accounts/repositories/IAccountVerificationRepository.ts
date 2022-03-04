import { AccountVerification } from "../entities/AccountVerification";

interface ICreateAccountVerificationDTO {
  user_id?: string;
  client_id?: string;
  code: string;
}

interface IAccountVerificationRepository {
  create({
    user_id,
    client_id,
    code,
  }: ICreateAccountVerificationDTO): Promise<void>;
  findByCode(code: string): Promise<AccountVerification | undefined>;
  deleteById(id: string): Promise<void>;
}

export { IAccountVerificationRepository, ICreateAccountVerificationDTO };
