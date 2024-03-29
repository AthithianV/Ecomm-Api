// Manage routes/paths to ProductController

// 1. Import express.
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";

// 2. Initialize Express router.
const productRouter = express.Router();
const productController = new ProductController();

// All the paths to the controller methods.
// localhost/api/products
productRouter.post("/rate", (req, res, next) => {
  productController.rateProduct(req, res, next);
});

productRouter.get("/filter", (req, res, next) => {
  productController.filterProducts(req, res, next);
});

productRouter.get("/", (req, res, next) => {
  productController.getAllProducts(req, res, next);
});
productRouter.post("/", upload.single("imageUrl"), (req, res, next) => {
  productController.addProduct(req, res, next);
});
productRouter.get("/averagePrice", (req, res, next) => {
  productController.averagePrice(req, res, next);
});
productRouter.get("/:id", (req, res, next) => {
  productController.getProduct(req, res, next);
});

// localhost:3000/api/products/filter?minPrice=10&maxPrice=20&category=Category1

export default productRouter;
