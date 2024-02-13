import express from "express";
import CartItemsController from "./cartitems.controller.js";

const CartitemsRouter = express.Router();
const cartitemsController = new CartItemsController();

CartitemsRouter.get("/", (req, res, next) => {
  cartitemsController.get(req, res, next);
});
CartitemsRouter.post("/", (req, res, next) => {
  cartitemsController.add(req, res, next);
});
CartitemsRouter.put("/", (req, res, next) => {
  cartitemsController.update(req, res, next);
});
CartitemsRouter.delete("/:id", (req, res, next) => {
  cartitemsController.delete(req, res, next);
});

export default CartitemsRouter;
