import mongoose from "mongoose";

const LikeSchema = mongoose
  .Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "on_model",
    },
    on_model: { type: String, enum: ["products", "categories"] },
  })
  .pre("save", (next) => {
    console.log("Like is Coming");
    next();
  })
  .post("save", (doc) => {
    console.log("like is save");
    console.log(doc);
  })
  .pre("find", (next) => {
    console.log("Finding the document");
    next();
  })
  .post("find", (doc) => {
    console.log("Found doc");
    console.log(doc);
  });

export default LikeSchema;
