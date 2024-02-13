import express from "express";
import LikeController from "./like.controller.js";

const LikeRouter = express.Router();
const likeController = new LikeController();

LikeRouter.get("/", (req, res, next) => {
  likeController.getLikes(req, res, next);
});

LikeRouter.post("/", (req, res, next) => {
  likeController.likeItem(req, res, next);
});

export default LikeRouter;
