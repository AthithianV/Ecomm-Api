import CartItemsRepository from "./cart.repository.js";
import CartItemsModel from "./cartitems.model.js";

export default class CartItemsController {
  constructor() {
    this.cartItemsRepository = new CartItemsRepository();
  }

  async add(req, res, next) {
    try {
      const { productID, quantity } = req.body;
      const userID = req.userID;
      await this.cartItemsRepository.add(productID, userID, quantity);
      res.status(201).send("Cart item added");
    } catch (err) {
      next(err);
    }
  }

  async get(req, res, next) {
    try {
      const cartItems = await this.cartItemsRepository.get(req.userID);
      res.status(200).send(cartItems);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res) {
    try {
      const { itemID, quantity } = req.query;
      const status = await this.cartItemsRepository.update(
        itemID,
        parseInt(quantity)
      );
      res.status(200).send("Item Updated");
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res) {
    try {
      const itemID = req.params.id;
      const userID = req.userID;
      const deleted = await this.cartItemsRepository.delete(itemID, userID);
      if (!deleted) {
        return res.status(200).send("Item not found");
      }
      res.status(200).send("Item is deleted");
    } catch (err) {
      next(err);
    }
  }
}
