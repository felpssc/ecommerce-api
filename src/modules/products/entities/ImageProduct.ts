import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Product } from "./Product";

@Entity("image_product")
class ImageProduct {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  file: string;

  @Column("uuid")
  productId: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { ImageProduct };
