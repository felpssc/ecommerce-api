import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { VerifyAccountController } from "../modules/accounts/useCases/verifyAccount/VerifyAccountController";

const authenticateUserController = new AuthenticateUserController();
const verifyAccountController = new VerifyAccountController();

const routes = Router();

routes.get("/verify-account/:code", verifyAccountController.handle);
routes.post("/user", authenticateUserController.handle);

export { routes as AuthenticateRoutes };
