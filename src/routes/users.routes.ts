import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureUser } from "../middlewares/ensureUser";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { DeleteUserController } from "../modules/accounts/useCases/deleteUser/DeleteUserController";
import { ListUsersController } from "../modules/accounts/useCases/listUsers/ListUsersController";
import { ShowUserProfileController } from "../modules/accounts/useCases/showUserProfile/ShowUserProfileController";

const routes = Router();

const createUserController = new CreateUserController();
const showUserProfileController = new ShowUserProfileController();
const listUsersController = new ListUsersController();
const deleteUserController = new DeleteUserController();

routes.post("/", createUserController.handle);
routes.get("/", ensureAuthenticated, ensureUser, listUsersController.handle);
routes.get(
  "/profile",
  ensureAuthenticated,
  ensureUser,
  showUserProfileController.handle
);
routes.delete(
  "/",
  ensureAuthenticated,
  ensureUser,
  deleteUserController.handle
);

export { routes as UsersRoutes };
