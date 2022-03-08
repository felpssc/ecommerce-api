import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureUser } from "../middlewares/ensureUser";
import { CreateProductController } from "../modules/products/useCases/createProduct/CreateProductController";
import { ListProductsController } from "../modules/products/useCases/listProducts/ListProductsController";
import { UploadProductImageController } from "../modules/products/useCases/uploadProductImage/UploadProductImageController";

const routes = Router();

const upload = multer();

const createProductController = new CreateProductController();
const uploadProductImageController = new UploadProductImageController();
const listProductsController = new ListProductsController();

routes.post("/", ensureAuthenticated, createProductController.handle);
routes.get("/", ensureAuthenticated, listProductsController.handle);
routes.post(
  "/:productId/images",
  upload.array("images", 5),
  ensureAuthenticated,
  ensureUser,
  uploadProductImageController.handle
);

export { routes as ProductsRoutes };
