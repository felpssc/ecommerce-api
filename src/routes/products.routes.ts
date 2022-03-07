import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureUser } from "../middlewares/ensureUser";
import { CreateProductController } from "../modules/products/useCases/createProduct/CreateProductController";
import { UploadProductImageController } from "../modules/products/useCases/uploadProductImage/UploadProductImageController";

const routes = Router();

const upload = multer();

const createProductController = new CreateProductController();
const uploadProductImageController = new UploadProductImageController();

routes.post("/", ensureAuthenticated, createProductController.handle);
routes.post(
  "/:productId/images",
  upload.array("images", 5),
  ensureAuthenticated,
  ensureUser,
  uploadProductImageController.handle
);

export { routes as ProductsRoutes };
