import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateProductController } from "../modules/products/useCases/createProduct/CreateProductController";

const routes = Router();

const createProductController = new CreateProductController();

routes.post("/", ensureAuthenticated, createProductController.handle);

export { routes as ProductsRoutes };
