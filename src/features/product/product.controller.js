import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res, next) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      next(err);
    }
  }

  async addProduct(req, res, next) {
    try {
      const { name, price, sizes, description, categories } = req.body;
      const newProduct = new ProductModel(
        name,
        description,
        parseFloat(price),
        req.file.filename,
        categories,
        sizes ? sizes.split(",") : null
      );
      const createdRecord = await this.productRepository.add(newProduct);
      res.status(201).send(createdRecord);
    } catch (err) {
      next(err);
    }
  }

  async rateProduct(req, res, next) {
    try {
      const { productID, rating } = req.body;
      const userID = req.userID;
      await this.productRepository.rateProduct(userID, productID, rating);
      res.status(200).send("Rating Added");
    } catch (err) {
      next(err);
    }
  }

  async getProduct(req, res, next) {
    try {
      const product = await this.productRepository.get(req.params.id);
      if (!product) {
        return res.status(404).send("Product Not found");
      }
      res.status(200).send(product);
    } catch (err) {
      next(err);
    }
  }

  async filterProducts(req, res, next) {
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.categories;

      const result = await this.productRepository.filter(
        minPrice,
        maxPrice,
        category
      );
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  async averagePrice(req, res, next) {
    try {
      const result = await this.productRepository.getAveragePriceByCategory();
      res.status(200).send(result);
    } catch {
      next(err);
    }
  }
}
