import LikeRepository from "./like.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  async likeItem(req, res, next) {
    try {
      const userId = req.userId;
      const { id, type } = req.body;
      if (type !== "Product" && type !== "Category") {
        return res.status(400).send("Invalid Input");
      }
      if (type == "Product") {
        await this.likeRepository.likeProduct(userId, id);
      } else {
        await this.likeRepository.likeCategory(userId, id);
      }
      res.status(201).send("Item is Liked");
    } catch (error) {
      next(error);
    }
  }

  async getLikes(req, res, next) {
    try {
      const { id, type } = req.query;
      const likes = await this.likeRepository.getLikes(id, type);
      res.status(200).send(likes);
    } catch (error) {
      next(error);
    }
  }
}
