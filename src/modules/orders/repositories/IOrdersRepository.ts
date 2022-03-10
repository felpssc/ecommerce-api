import { Order } from "../entities/Order";

interface ICreateOrderDTO {
  clientId: string;
  payment_price: number;
  status: "pending" | "delivered";
}

interface IParams {
  id?: string;
  startDate?: Date;
  endDate?: Date;
  clientId?: string;
  minPaymentPrice?: number;
  maxPaymentPrice?: number;
  status?: "pending" | "delivered";
  productId?: string;
  limit?: number;
  offset?: number;
}

interface IOrdersRepository {
  create({ clientId, payment_price }: ICreateOrderDTO): Promise<Order>;
  findAll({
    id,
    startDate,
    endDate,
    clientId,
    minPaymentPrice,
    maxPaymentPrice,
    status,
    productId,
    limit,
    offset,
  }: IParams): Promise<[Order[], number]>;
  findByClientId(clientId: string): Promise<Order[]>;
  findById(id: string): Promise<Order>;
  updateStatus(id: string, status: "pending" | "delivered"): Promise<Order>;
}

export { ICreateOrderDTO, IOrdersRepository, IParams };
