import UserModel from "../user/user.model.js";
import ProductModel from "../product/product.model.js";

export default class CartItemsModel {
  constructor(userID, productID, quantity, id) {
    this.userID = userID;
    this.productID = productID;
    this.quantity = quantity;
    this.id = id;
  }
}
