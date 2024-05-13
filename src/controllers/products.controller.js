import { ProductsRepository } from "../repositories/products.repository.js";

export class ProductsController {
  static instance;
  constructor() {
    this.repository = new ProductsRepository();
  }

  getById = async (req, res) => {
    const id = Number(req.params.id);
    const product = await this.repository.getById(id);
    return res.json(product);
  };

  getAllProducts = async (req, res) => {
    const allProducts = await this.repository.getAllProducts();
    return res.json(allProducts);
  };

  getProduct = async (req, res) => {
    const id = Number(req.params.id);
    const product = await this.repository.getProduct(id);
    return res.json(product);
  };

  createProduct = async (req, res) => {
    const product = req.body;

    const createdProduct = await this.repository.createProduct(product);

    return res.json(createdProduct);
  };

  updateProduct = async (req, res) => {
    const id = Number(req.params.id);
    const product = req.body;

    const productUpdated = await this.repository.updateProduct({
      id,
      ...product,
    });

    return res.json(productUpdated);
  };

  deleteProduct = async (req, res) => {
    const id = Number(req.params.id);

    await this.repository.deleteProduct(id);

    return res.json({ ok: true });
  };
}
