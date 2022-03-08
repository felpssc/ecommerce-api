import { Order } from "../entities/Order";

interface ICreateOrderDTO {
  clientId: string;
  payment_price: number;
  status: "pending" | "delivered";
}

interface IOrdersRepository {
  create({ clientId, payment_price }: ICreateOrderDTO): Promise<Order>;
}

export { ICreateOrderDTO, IOrdersRepository };
