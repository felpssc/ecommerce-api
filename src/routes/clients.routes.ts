import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureClient } from "../middlewares/ensureClient";
import { ensureUser } from "../middlewares/ensureUser";
import { CreateClientController } from "../modules/accounts/useCases/createClient/CreateClientController";
import { ListClientsController } from "../modules/accounts/useCases/listClients/ListClientsController";
import { ShowClientProfileController } from "../modules/accounts/useCases/showClientProfile/ShowClientProfileController";

const routes = Router();

const createClientController = new CreateClientController();
const showClientProfileController = new ShowClientProfileController();
const listClientsController = new ListClientsController();

routes.post("/", createClientController.handle);
routes.get("/", ensureAuthenticated, ensureUser, listClientsController.handle);
routes.get(
  "/profile",
  ensureAuthenticated,
  ensureClient,
  showClientProfileController.handle
);

export { routes as ClientsRoutes };
