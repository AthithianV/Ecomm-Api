import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  name: { type: String },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
});

export default CategorySchema;
