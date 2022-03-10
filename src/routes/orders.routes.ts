import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureClient } from "../middlewares/ensureClient";
import { ensureUser } from "../middlewares/ensureUser";
import { CreateOrderController } from "../modules/orders/useCases/createOrder/CreateOrderController";
import { ListOrdersController } from "../modules/orders/useCases/listOrders/ListOrdersController";
import { UpdateOrderStatusController } from "../modules/orders/useCases/updateOrderStatus/UpdateOrderStatusController";

const routes = Router();

const createOrderController = new CreateOrderController();
const listOrdersController = new ListOrdersController();
const updateOrderStatusController = new UpdateOrderStatusController();

routes.post(
  "/create",
  ensureAuthenticated,
  ensureClient,
  createOrderController.handle
);
routes.get("/", ensureAuthenticated, ensureUser, listOrdersController.handle);
routes.put(
  "/:id/status",
  ensureAuthenticated,
  ensureUser,
  updateOrderStatusController.handle
);

export { routes as OrdersRoutes };
