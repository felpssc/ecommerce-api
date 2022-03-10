import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureClient } from "../middlewares/ensureClient";
import { ensureUser } from "../middlewares/ensureUser";
import { CreateClientController } from "../modules/accounts/useCases/createClient/CreateClientController";
import { CreateClientAddressController } from "../modules/accounts/useCases/createClientAddress/CreateClientAddressController";
import { DeleteClientController } from "../modules/accounts/useCases/deleteClient/DeleteClientController";
import { DeleteClientAddressController } from "../modules/accounts/useCases/deleteClientAddress/DeleteClientAddressController";
import { ListClientAddressesController } from "../modules/accounts/useCases/listClientAddresses/ListClientAddressesController";
import { ListClientsController } from "../modules/accounts/useCases/listClients/ListClientsController";
import { ShowClientProfileController } from "../modules/accounts/useCases/showClientProfile/ShowClientProfileController";
import { UpdateClientAddressController } from "../modules/accounts/useCases/updateClientAddress/UpdateClientAddressController";
import { UpdateClientProfileController } from "../modules/accounts/useCases/UpdateClientProfile/UpdateClientProfileController";
import { ListClientOrdersController } from "../modules/orders/useCases/listClientOrders/ListClientOrdersController";

const routes = Router();

const createClientController = new CreateClientController();
const showClientProfileController = new ShowClientProfileController();
const listClientsController = new ListClientsController();
const listClientOrdersController = new ListClientOrdersController();
const updateClientProfileController = new UpdateClientProfileController();
const deleteClientController = new DeleteClientController();
const createClientAddressController = new CreateClientAddressController();
const listClientAddressesController = new ListClientAddressesController();
const updateClientAddressController = new UpdateClientAddressController();
const deleteClientAddressController = new DeleteClientAddressController();

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
routes.post(
  "/addresses",
  ensureAuthenticated,
  ensureClient,
  createClientAddressController.handle
);
routes.get(
  "/addresses",
  ensureAuthenticated,
  ensureClient,
  listClientAddressesController.handle
);
routes.put(
  "/addresses/:id",
  ensureAuthenticated,
  ensureClient,
  updateClientAddressController.handle
);
routes.delete(
  "/addresses/:id",
  ensureAuthenticated,
  ensureClient,
  deleteClientAddressController.handle
);

export { routes as ClientsRoutes };
