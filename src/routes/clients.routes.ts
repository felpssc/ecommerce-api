import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureClient } from "../middlewares/ensureClient";
import { ensureUser } from "../middlewares/ensureUser";
import { CreateClientController } from "../modules/accounts/useCases/createClient/CreateClientController";
import { DeleteClientController } from "../modules/accounts/useCases/deleteClient/DeleteClientController";
import { ListClientsController } from "../modules/accounts/useCases/listClients/ListClientsController";
import { ShowClientProfileController } from "../modules/accounts/useCases/showClientProfile/ShowClientProfileController";
import { UpdateClientProfileController } from "../modules/accounts/useCases/UpdateClientProfile/UpdateClientProfileController";
import { ListClientOrdersController } from "../modules/orders/useCases/listClientOrders/ListClientOrdersController";

const routes = Router();

const createClientController = new CreateClientController();
const showClientProfileController = new ShowClientProfileController();
const listClientsController = new ListClientsController();
const listClientOrdersController = new ListClientOrdersController();
const updateClientProfileController = new UpdateClientProfileController();
const deleteClientController = new DeleteClientController();

routes.post("/", createClientController.handle);
routes.get("/", ensureAuthenticated, ensureUser, listClientsController.handle);
routes.get(
  "/profile",
  ensureAuthenticated,
  ensureClient,
  showClientProfileController.handle
);
routes.get(
  "/my-orders",
  ensureAuthenticated,
  ensureClient,
  listClientOrdersController.handle
);
routes.put(
  "/",
  ensureAuthenticated,
  ensureClient,
  updateClientProfileController.handle
);
routes.delete(
  "/",
  ensureAuthenticated,
  ensureClient,
  deleteClientController.handle
);

export { routes as ClientsRoutes };
