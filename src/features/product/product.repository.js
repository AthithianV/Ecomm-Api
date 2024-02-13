import { ObjectId } from "mongodb";
import ApplicationError from "../../Error Handers/applicationErrors.js";
import { getDb } from "../../config/mongodb.js";
import mongoose from "mongoose";
import { ProductSchema } from "./product.schema.js";
import { ReviewSchema } from "./review.schema.js";
import CategorySchema from "./category.schema.js";

const ProductModel = mongoose.model("products", ProductSchema);
const ReviewModel = mongoose.model("Reviews", ReviewSchema);
const CategoryModel = mongoose.model("categories", CategorySchema);

export default class ProductRepository {
  constructor() {
    this.collection = "products";
  }

  async add(productData) {
    try {
      productData.categories = productData.categories.split(",");
      const newProduct = new ProductModel(productData);
      const savedProduct = await newProduct.save();

      await CategoryModel.updateMany(
        { _id: { $in: productData.categories } },
        { $push: { products: new ObjectId(savedProduct._id) } }
      );

      return savedProduct;
    } catch (err) {
      throw err;
    }
  }

  async getAll() {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const products = await collection.find().toArray();
      return products;
    } catch (err) {
      throw new ApplicationError("Something went wrong: " + err.message, 400);
    }
  }

  async get(id) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const products = await collection.findOne({ _id: new ObjectId(id) });
      return products;
    } catch (err) {
      throw new ApplicationError("Something went wrong: " + err.message, 400);
    }
  }

  async filter(minPrice, maxPrice, categories) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      let filterExp = {};
      if (minPrice) {
        filterExp.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExp.price = { ...filterExp.price, $lte: parseFloat(maxPrice) };
      }
      let categoriesArr = JSON.parse(categories.replace(/'/g, '"'));

      if (categoriesArr) {
        filterExp = { $and: [{ category: { $in: categoriesArr } }, filterExp] };
      }
      const result = await collection
        .find(filterExp)
        .project({ _id: 0, name: 1, price: 1 })
        .toArray();
      return result;
    } catch (err) {
      throw new ApplicationError(
        "Something went wrong in Repositroy: " + err.message + err.stack,
        400
      );
    }
  }

  // async rateProduct(userID, productID, rating) {
  //   try {
  //     const db = getDb();
  //     const collection = db.collection(this.collection);
  //     const product = await collection.findOne({
  //       _id: new ObjectId(productID),
  //     });

  //     const UserRated = await product?.ratings?.find(
  //       (p) => p.userID == new ObjectId(userID)
  //     );

  //     if (UserRated) {

  //       await collection.updateOne(
  //         {
  //           _id: new ObjectId(productID),
  //           "ratings.userID": new ObjectId(userID),
  //         },
  //         { $set: { "ratings.$.rating": rating } }
  //       );
  //     } else {
  //       await collection.updateOne(
  //         { _id: new ObjectId(productID) },
  //         { $push: { ratings: { userID, rating } } }
  //       );
  //     }
  //   } catch (err) {
  //     throw new ApplicationError("Something went wrong: " + err.message, 400);
  //   }
  // }

  async rateProduct(userID, productID, rating) {
    try {
      const productToUpdate = await ProductModel.findById(productID);
      if (!productToUpdate) {
        throw new ApplicationError("Product Not found" + err.message, 400);
      }

      const reviewExists = await ReviewModel.findOne({
        user: new ObjectId(userID),
        product: new ObjectId(productID),
      });

      if (reviewExists) {
        reviewExists.rating = rating;
        await reviewExists.save();
      } else {
        const newReview = new ReviewModel({
          user: new ObjectId(userID),
          product: new ObjectId(productID),
          rating: rating,
        });
        await newReview.save();
        await ProductModel.updateOne(
          { _id: productID },
          { $push: { reviews: newReview._id } }
        );
      }
    } catch (err) {
      throw new ApplicationError("Something went wrong: " + err.message, 400);
    }
  }

  async getAveragePriceByCategory() {
    try {
      const db = getDb();
      const result = await db
        .collection(this.collection)
        .aggregate([
          {
            $group: {
              _id: "$category",
              averagePrice: { $avg: "$price" },
            },
          },
        ])
        .toArray();
      return result;
    } catch (err) {
      throw new ApplicationError(
        "Something went wrong with DataBase: " + err.message,
        400
      );
    }
  }
}
