import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Client } from "../../accounts/entities/Client";
import { ProductOrder } from "./ProductOrder";

@Entity("orders")
class Order {
  @PrimaryColumn("uuid")
  id: string;

  @Column("uuid")
  clientId: string;

  @Column({ enum: ["pending", "delivered"], default: "pending" })
  status: string;

  @Column()
  payment_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.order)
  products: ProductOrder[];

  @ManyToOne(() => Client, (client) => client)
  client: Client;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Order };
