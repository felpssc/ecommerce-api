import { Router } from "express";

import { CreateClientController } from "../modules/accounts/useCases/createClient/CreateClientController";

const routes = Router();

const createClientController = new CreateClientController();

routes.post("/", createClientController.handle);

export { routes as ClientsRoutes };
