import { Router } from "express";

import { AuthenticateClientController } from "../modules/accounts/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { VerifyAccountController } from "../modules/accounts/useCases/verifyAccount/VerifyAccountController";

const authenticateUserController = new AuthenticateUserController();
const authenticateClientController = new AuthenticateClientController();
const verifyAccountController = new VerifyAccountController();

const routes = Router();

routes.get("/verify-account/:code", verifyAccountController.handle);
routes.post("/user/session", authenticateUserController.handle);
routes.post("/client/session", authenticateClientController.handle);

export { routes as AuthenticateRoutes };
