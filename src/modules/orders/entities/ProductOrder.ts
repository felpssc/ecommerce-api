import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Order } from "./Order";

@Entity("product_order")
class ProductOrder {
  @PrimaryColumn("uuid")
  id: string;

  @Column("uuid")
  productId: string;

  @Column()
  quantity: number;

  @Column("uuid")
  orderId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;

  @OneToOne(() => Order, (order) => order.products)
  order: Order;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { ProductOrder };
