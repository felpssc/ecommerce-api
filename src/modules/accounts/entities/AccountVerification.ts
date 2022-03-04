import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("account_verification")
class AccountVerification {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @Column()
  client_id: string;

  @Column()
  code: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { AccountVerification };
