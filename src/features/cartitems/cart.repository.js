import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";
import ApplicationError from "../../Error Handers/applicationErrors.js";

export default class CartItemsRepository {
  constructor() {
    this.collectionName = "CartItems";
  }

  async add(productId, userId, quantity) {
    try {
      const db = getDb();
      const collection = db.collection(this.collectionName);
      const id = await this.counterIncrementor(db);
      await collection.updateOne(
        { productID: new ObjectId(productId), userID: new ObjectId(userId) },
        { $setOnInsert: { _id: id }, $set: { quantity } },
        { upsert: true }
      );
    } catch (err) {
      throw new ApplicationError(
        "something went wrong with DATABASE" + err.message,
        500
      );
    }
  }

  async get(userID) {
    try {
      const db = getDb();
      const collection = db.collection(this.collectionName);
      return await collection.find({ userID: new ObjectId(userID) }).toArray();
    } catch (err) {
      throw new ApplicationError(
        "something went wrong with DATABASE" + err.message,
        500
      );
    }
  }

  async delete(itemID, userID) {
    try {
      const db = getDb();
      const collection = db.collection(this.collectionName);
      const deletedCount = await collection.deleteOne({
        _id: new ObjectId(itemID),
        userID: new ObjectId(userID),
      });
      return deletedCount > 0;
    } catch (err) {
      throw new ApplicationError(
        "something went wrong with DATABASE" + err.message,
        500
      );
    }
  }

  async counterIncrementor(db) {
    const counter = await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: "cartItemId" },
        { $inc: { value: 1 } },
        { returnDocument: "after" }
      );
    return counter.value;
  }
}
