import { CartsRepository } from "../repositories/carts.repository.js";

export class CartsController {
  static instance;
  constructor() {
    this.repository = new CartsRepository();
  }

  getCart = async (req, res) => {
    const userId = req.user.userId;
    const cart = await this.repository.getCart(userId);
    return res.json(cart);
  };

  getAllCarts = async (req, res) => {
    const userId = req.user.userId;
    const allCarts = await this.repository.getAllCarts(userId);
    return res.json(allCarts);
  };

  createCart = async (req, res) => {
    const userId = req.user.userId;
    const cart = req.body;

    const createdCart = await this.repository.createCart({
      ...cart,
      userId,
    });

    return res.json(createdCart);
  };

  updateCart = async (req, res) => {
    const userId = req.user.userId;
    const cart = req.body;

    const cartUpdated = await this.repository.updateCart({
      ...cart,
      userId,
    });

    return res.json(cartUpdated);
  };

  deleteCart = async (req, res) => {
    const userId = req.user.userId;
    const productId = Number(req.params.productId);

    await this.repository.deleteCartItem({ userId, productId });

    return res.json({ ok: true });
  };
}
