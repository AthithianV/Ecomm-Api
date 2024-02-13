import mongoose from "mongoose";
import LikeSchema from "./like.schema.js";
import ApplicationError from "../../Error Handers/applicationErrors.js";
import { ObjectId } from "mongodb";

const LikeModel = mongoose.model("likes", LikeSchema);

export default class LikeRepository {
  async likeProduct(userId, productId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(productId),
        on_model: "products",
      });
      newLike.save();
    } catch (error) {
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async likeCategory(userId, categoryId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(categoryId),
        on_model: "categories",
      });
      await newLike.save();
    } catch (error) {
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getLikes(id, type) {
    try {
      const likes = await LikeModel.find({
        likeable: new ObjectId(id),
        on_model: type,
      })
        .populate("user")
        .populate({ path: "likeable", model: type });
      return likes;
    } catch (error) {
      throw new ApplicationError(
        "Something went wrong with database: " + error.message,
        500
      );
    }
  }
}
