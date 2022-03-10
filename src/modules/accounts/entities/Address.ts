import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Client } from "./Client";

@Entity("addresses")
class Address {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  street: string;

  @Column()
  district: string;

  @Column()
  number: string;

  @Column()
  cep: string;

  @Column()
  clientId: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Client, (client) => client.addresses)
  client: Client;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Address };
