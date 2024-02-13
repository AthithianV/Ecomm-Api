import mongoose from "mongoose";
import { UserSchema } from "./user.schema.js";
import ApplicationError from "../../Error Handers/applicationErrors.js";

const UserModel = mongoose.model("users", UserSchema);

export default class UserRepository {
  async resetPassword(newPassword, userID) {
    try {
      const user = await UserModel.findById(userID);
      user.password = newPassword;
      await user.save();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something Went Wrong with DataBase", 500);
    }
  }

  async register(user) {
    try {
      const newUser = new UserModel(user);
      await newUser.save();
      return newUser;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        console.log(err);
        throw new ApplicationError("Something Went Wrong with DataBase", 500);
      }
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something Went Wrong with DataBase", 500);
    }
  }
}
