import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;

  hidePassword() {
    delete this.password;
    return this;
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };
