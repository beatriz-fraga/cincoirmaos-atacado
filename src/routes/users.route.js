import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";

export const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get("/", usersController.getUser);
usersRouter.post("/", usersController.createUser);
usersRouter.patch("/", authenticationMiddleware, usersController.updateUser);
usersRouter.delete("/", authenticationMiddleware, usersController.deleteUser);
