import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [25, "User name must be within 25 characters"],
  },
  email: {
    type: String,
    unique: [true, "EmailId is Already Register"],
    required: true,
  },
  password: {
    type: String,
    // validate: {
    //   validator: function (value) {
    //     return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
    //   },
    //   message:
    //     "Password Should be between 8-12 characters and have a special character",
    // },
  },
  type: { type: String, enum: ["Customer", "Seller"] },
});
