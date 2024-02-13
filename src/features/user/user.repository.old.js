import ApplicationError from "../../Error Handers/applicationErrors.js";
import { getDb } from "../../config/mongodb.js";

export default class UserRepository {
  async register(newUser) {
    try {
      const db = getDb();
      const collection = db.collection("users");
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async findByEmail(email) {
    try {
      const db = getDb();
      const collection = db.collection("users");
      return await collection.findOne({ email });
    } catch (err) {
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }
}
