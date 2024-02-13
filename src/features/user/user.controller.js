import UserModel from "./user.model.js";
import Jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(req, res, next) {
    try {
      const { name, email, password, type } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new UserModel(name, email, hashedPassword, type);
      await this.userRepository.register(newUser);
      res.status(201).send(newUser);
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const newPassword = await bcrypt.hash(req.body.newPassword, 12);
      const userID = req.userID;
      await this.userRepository.resetPassword(newPassword, userID);
      res.status(200).send("Password is Updated");
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      }

      const result = bcrypt.compare(password, user.password);

      if (!result) {
        return res.status(400).send("Incorrect Credentials");
      }

      // 1. Create Token
      const token = Jwt.sign(
        { userID: user._id, userName: user.name },
        "jyl95T1yf0YKXiMSASEyJNCr6MGC2wxJ",
        { expiresIn: "1d" }
      );

      // 2. Send Token
      res.status(200).send(token);
    } catch (err) {
      next(err);
    }
  }
}
