import express from "express";
import UserController from "./user.controller.js";
import jwtauth from "../../middlewares/jwt.middleware.js";

const UserRouter = express.Router();
const userController = new UserController();

UserRouter.post("/login", (req, res, next) => {
  userController.login(req, res, next);
});
UserRouter.post("/register", (req, res, next) => {
  userController.register(req, res, next);
});
UserRouter.post("/resetPassword", jwtauth, (req, res, next) => {
  userController.resetPassword(req, res, next);
});

export default UserRouter;
