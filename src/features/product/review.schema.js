import mongoose from "mongoose";

export const ReviewSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  rating: Number,
});
