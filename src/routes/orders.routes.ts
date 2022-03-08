import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureClient } from "../middlewares/ensureClient";
import { CreateOrderController } from "../modules/orders/useCases/createOrder/CreateOrderController";

const routes = Router();

const createOrderController = new CreateOrderController();

routes.post(
  "/create",
  ensureAuthenticated,
  ensureClient,
  createOrderController.handle
);

export { routes as OrdersRoutes };
