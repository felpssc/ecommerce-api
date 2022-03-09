import {
  getRepository,
  Repository,
  Between,
  MoreThanOrEqual,
  LessThanOrEqual,
} from "typeorm";

import { Order } from "../../entities/Order";
import {
  ICreateOrderDTO,
  IOrdersRepository,
  IParams,
} from "../IOrdersRepository";

class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

  async create({
    clientId,
    status,
    payment_price,
  }: ICreateOrderDTO): Promise<Order> {
    const order = this.repository.create({
      clientId,
      status,
      payment_price,
    });

    await this.repository.save(order);

    return order;
  }

  async findAll({
    id,
    startDate,
    endDate,
    clientId,
    minPaymentPrice,
    maxPaymentPrice,
    status,
    productId,
  }: IParams): Promise<[Order[], number]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filters: any = {};

    if (id) filters.id = id;

    if (startDate) filters.created_at = startDate;

    if (endDate) filters.created_at = endDate;

    if (startDate && endDate) filters.created_at = Between(startDate, endDate);

    if (clientId) filters.clientId = clientId;

    if (minPaymentPrice)
      filters.payment_price = MoreThanOrEqual(minPaymentPrice);

    if (maxPaymentPrice)
      filters.payment_price = LessThanOrEqual(maxPaymentPrice);

    if (minPaymentPrice && maxPaymentPrice)
      filters.payment_price = Between(minPaymentPrice, maxPaymentPrice);

    if (status) filters.status = status;

    const select = [
      "orders",
      "client.id",
      "client.email",
      "client.name",
      "client.phone",
      "products",
      "product",
    ];

    if (productId) {
      const orders = await this.repository
        .createQueryBuilder("orders")
        .leftJoinAndSelect("orders.client", "client")
        .leftJoinAndSelect("orders.products", "products")
        .leftJoinAndSelect("products.product", "product")
        .where("product.id = :productId", { productId })
        .select(select)
        .andWhere(filters)
        .getManyAndCount();

      return orders;
    }

    const orders = await this.repository
      .createQueryBuilder("orders")
      .leftJoin("orders.client", "client")
      .leftJoinAndSelect("orders.products", "products")
      .leftJoinAndSelect("products.product", "product")
      .where(filters)
      .select(select)
      .getManyAndCount();

    return orders;
  }

  findByClientId(clientId: string): Promise<Order[]> {
    const orders = this.repository
      .createQueryBuilder("orders")
      .leftJoinAndSelect("orders.products", "products")
      .leftJoinAndSelect("products.product", "product")
      .where("orders.clientId = :clientId", { clientId })
      .getMany();

    return orders;
  }

  async findById(id: string): Promise<Order> {
    const order = await this.repository.findOne({ id });

    return order;
  }

  async updateStatus(
    id: string,
    status: "pending" | "delivered"
  ): Promise<Order> {
    const order = await this.repository.findOne({ id });

    order.status = status;

    await this.repository.save(order);

    return order;
  }
}

export { OrdersRepository };
