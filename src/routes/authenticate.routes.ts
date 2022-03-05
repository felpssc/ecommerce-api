import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateUserController = new AuthenticateUserController();

const routes = Router();

routes.post("/user", authenticateUserController.handle);

export { routes as AuthenticateRoutes };
