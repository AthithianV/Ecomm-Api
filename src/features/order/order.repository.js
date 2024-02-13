// import OrderModel from "./order.model.js";
import { ObjectId } from "mongodb";
import { getClient, getDb } from "../../config/mongodb.js";
import ApplicationError from "../../Error Handers/applicationErrors.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collectionName = "CartItems";
  }

  async placeOrder(userID) {
    const client = getClient();
    const session = client.startSession();

    try {
      session.startTransaction();
      const db = getDb();
      //1. Get the products in the cart and  Calculate the total amount.
      const items = await this.getTotalAmount(userID, session);
      const totalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );

      // 2. Create new Order.
      const newOrder = new OrderModel(
        new ObjectId(userID),
        totalAmount,
        Date.now()
      );
      await db.collection("orders").insertOne(newOrder, { session });

      // 3.  Reduce the stock
      for (let item of items) {
        await db
          .collection("products")
          .updateOne(
            { _id: item.productID },
            { $inc: { stock: -item.quantity } },
            { session }
          );
      }

      await db
        .collection("CartItems")
        .deleteMany({ userID: new ObjectId(userID) }, session);

      await session.commitTransaction();
      session.endSession();
      return;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw new ApplicationError("Sometime went wrong with database", 500);
    } finally {
      client.close();
    }
  }

  async getTotalAmount(userID, session) {
    const db = getDb();

    const items = await db
      .collection(this.collectionName)
      .aggregate(
        [
          // 1. Get cartItems for usr
          { $match: { userID: new ObjectId(userID) } },
          // 2. Get product from products collection
          {
            $lookup: {
              from: "products",
              localField: "productID",
              foreignField: "_id",
              as: "productInfo",
            },
          },
          //3. Unwind Product Info
          {
            $unwind: "$productInfo",
          },
          // 4. Calculate total amount for product
          {
            $addFields: {
              totalAmount: {
                $multiply: ["$productInfo.price", "$quantity"],
              },
            },
          },
        ],
        { session }
      )
      .toArray();

    return items;
  }
}
