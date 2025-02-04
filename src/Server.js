import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { cartsRouter } from "./routes/carts.route.js";
import { productsRouter } from "./routes/products.route.js";
import { usersRouter } from "./routes/users.route.js";
import { sessionRouter } from "./routes/session.route.js";

export class Server {
  constructor(port) {
    this.app = express();

    this.setMiddleware();

    this.setRoutes();

    this.listen(port);
  }

  setMiddleware() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors({ origin: "*" }));
  }

  setRoutes() {
    this.app.use(express.static("public"));
    this.app.use("/api/carts", cartsRouter);
    this.app.use("/api/products", productsRouter);
    this.app.use("/api/users", usersRouter);
    this.app.use("/api/session", sessionRouter);
  }

  listen(port) {
    this.app.listen(port, () => {
      console.log("App started, listen at port: " + port);
    });
  }
}
