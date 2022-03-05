import { Router } from "express";

import { AuthenticateRoutes } from "./authenticate.routes";
import { ClientsRoutes } from "./clients.routes";
import { UsersRoutes } from "./users.routes";

const router = Router();

router.use("/users", UsersRoutes);
router.use("/clients", ClientsRoutes);
router.use("/auth", AuthenticateRoutes);

export { router };
