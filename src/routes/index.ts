import { Router } from "express";

import { AuthenticateRoutes } from "./authenticate.routes";
import { UsersRoutes } from "./users.routes";

const router = Router();

router.use("/users", UsersRoutes);
router.use("/sessions", AuthenticateRoutes);

export { router };
