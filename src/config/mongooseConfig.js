import mongoose from "mongoose";
import dotenv from "dotenv";
import CategorySchema from "../features/product/category.schema.js";

dotenv.config();
const password = encodeURIComponent("AQ!SW@de3fr4");
const url = `mongodb+srv://Athithian:${password}@cluster0.jbnemwi.mongodb.net/?retryWrites=true&w=majority&appName=Ecomm_Database`;

export const connectWithMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    addCategories();
    console.log("MongoDb connected Using Mongoose");
  } catch (err) {
    console.log(err);
  }
};

async function addCategories() {
  try {
    const categoryModel = mongoose.model("Categories", CategorySchema);
    const categories = await categoryModel.find();
    if (!categories || categories.length == 0) {
      await categoryModel.insertMany([
        { name: "Books" },
        { name: "Electronics" },
        { name: "Gadgets" },
        { name: "Clothing" },
      ]);
    }
  } catch (err) {
    throw err;
  }
}
