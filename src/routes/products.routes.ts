import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureUser } from "../middlewares/ensureUser";
import { CreateProductController } from "../modules/products/useCases/createProduct/CreateProductController";
import { DeleteProductController } from "../modules/products/useCases/deleteProduct/DeleteProductController";
import { DeleteProductImageController } from "../modules/products/useCases/deleteProductImage/DeleteProductImageController";
import { ListProductsController } from "../modules/products/useCases/listProducts/ListProductsController";
import { UpdateProductController } from "../modules/products/useCases/updateProduct/UpdateProductController";
import { UploadProductImageController } from "../modules/products/useCases/uploadProductImage/UploadProductImageController";

const routes = Router();

const upload = multer();

const createProductController = new CreateProductController();
const uploadProductImageController = new UploadProductImageController();
const listProductsController = new ListProductsController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();
const deleteProductImageController = new DeleteProductImageController();

routes.post("/", ensureAuthenticated, createProductController.handle);
routes.get("/", ensureAuthenticated, listProductsController.handle);
routes.post(
  "/:productId/images",
  upload.array("images", 5),
  ensureAuthenticated,
  ensureUser,
  uploadProductImageController.handle
);
routes.put(
  "/:id",
  ensureAuthenticated,
  ensureUser,
  updateProductController.handle
);
routes.delete(
  "/:id",
  ensureAuthenticated,
  ensureUser,
  deleteProductController.handle
);
routes.delete(
  "/images/:imageId",
  ensureAuthenticated,
  ensureUser,
  deleteProductImageController.handle
);

export { routes as ProductsRoutes };
