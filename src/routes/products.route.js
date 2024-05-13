import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { adminCheckMiddleware } from "../middlewares/adminCheck.middleware.js";

export const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get(
  "/",
  productsController.getAllProducts
);
productsRouter.get(
  "/:id",
  authenticationMiddleware,
  adminCheckMiddleware,
  productsController.getById
);
productsRouter.post(
  "/",
  authenticationMiddleware,
  adminCheckMiddleware,
  productsController.createProduct
);
productsRouter.patch(
  "/:id",
  authenticationMiddleware,
  adminCheckMiddleware,
  productsController.updateProduct
);
productsRouter.delete(
  "/:id",
  authenticationMiddleware,
  productsController.deleteProduct
);
