import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Product } from "../../products/entities/Product";
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

  @ManyToOne(() => Order, (order) => order.products)
  order: Order;

  @ManyToOne(() => Product, (product) => product.productOrder)
  @JoinColumn({ name: "productId" })
  product: Product;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { ProductOrder };
