// 1. Import express
import "./env.js";
import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";

import productRouter from "./src/features/product/product.routes.js";
import UserRouter from "./src/features/user/user.routes.js";
import CartitemsRouter from "./src/features/cartitems/cartitem.routes.js";
import OrderRouter from "./src/features/order/order.routes.js";
import LikeRouter from "./src/features/like/like.routes.js";

import jwtauth from "./src/middlewares/jwt.middleware.js";
import apiDocs from "./swagger.json" assert { type: "json" };
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import ApplicationError from "./src/Error Handers/applicationErrors.js";
import connectToMongodb from "./src/config/mongodb.js";
import { errorLogger } from "./src/middlewares/logger.middleware.js";
import { connectWithMongoose } from "./src/config/mongooseConfig.js";
import mongoose from "mongoose";

// 2. Create Server
const server = express();

const corsOptions = {
  origin: "*",
  allowedHeaders: "*",
};

server.use(express.json());
server.use(cors());
server.use(loggerMiddleware);
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
server.use("/api/products", jwtauth, productRouter);
server.use("/api/user", UserRouter);
server.use("/api/cartItems", jwtauth, CartitemsRouter);
server.use("/api/order", jwtauth, OrderRouter);
server.use("/api/like", jwtauth, LikeRouter);

// 3. Default request handler
server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce APIs");
});

server.use((req, res) => {
  res.status(404).send("Page Not found");
});

server.use((err, req, res, next) => {
  const logData = `Requested URL: ${req.url}, Error Message: ${err.message}, Error Trace: ${err.stack}`;
  errorLogger.error(logData);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(500).send(err.message);
  }
  if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message);
  }

  res.status(503).send("Something Went wrong, Please Try Later");
});

// 4. Specify port.
server.listen(3000, () => {
  console.log("Server is running at 3000");
  connectWithMongoose();
  // connectToMongodb();
});
