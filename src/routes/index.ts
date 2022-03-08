import { Router } from "express";

import { AuthenticateRoutes } from "./authenticate.routes";
import { ClientsRoutes } from "./clients.routes";
import { OrdersRoutes } from "./orders.routes";
import { ProductsRoutes } from "./products.routes";
import { UsersRoutes } from "./users.routes";

const router = Router();

router.use("/users", UsersRoutes);

router.use("/clients", ClientsRoutes);

router.use("/auth", AuthenticateRoutes);

router.use("/products", ProductsRoutes);

router.use("/orders", OrdersRoutes);

export { router };
