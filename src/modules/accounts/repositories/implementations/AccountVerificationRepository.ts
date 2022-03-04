import { getRepository, Repository } from "typeorm";

import { AccountVerification } from "../../entities/AccountVerification";
import {
  IAccountVerificationRepository,
  ICreateAccountVerificationDTO,
} from "../IAccountVerificationRepository";

class AccountVerificationRepository implements IAccountVerificationRepository {
  private repository: Repository<AccountVerification>;

  constructor() {
    this.repository = getRepository(AccountVerification);
  }

  async create(data: ICreateAccountVerificationDTO): Promise<void> {
    const verification = this.repository.create(data);

    await this.repository.save(verification);
  }

  async findByCode(code: string): Promise<AccountVerification | undefined> {
    const verification = await this.repository.findOne({
      where: { code },
    });

    return verification;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { AccountVerificationRepository };
