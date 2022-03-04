import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { VerifyAccountController } from "../modules/accounts/useCases/verifyAccount/VerifyAccountController";

const routes = Router();

const createUserController = new CreateUserController();
const verifyAccountController = new VerifyAccountController();

routes.post("/", createUserController.handle);
routes.get("/verify-account/:code", verifyAccountController.handle);

export { routes as UsersRoutes };
