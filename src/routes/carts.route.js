import { Router } from "express";
import { CartsController } from "../controllers/carts.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";

export const cartsRouter = Router();
const cartsController = new CartsController();

cartsRouter.get("/", authenticationMiddleware, cartsController.getCart);
cartsRouter.get(
  "/closed",
  authenticationMiddleware,
  cartsController.getAllCarts
);
cartsRouter.post("/", authenticationMiddleware, cartsController.createCart);
cartsRouter.patch("/", authenticationMiddleware, cartsController.updateCart);
cartsRouter.delete(
  "/:productId",
  authenticationMiddleware,
  cartsController.deleteCart
);
