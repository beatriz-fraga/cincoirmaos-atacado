import { PrismaClient } from "@prisma/client";

export class CartsRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createCart({ userId, productId }) {
    const cartExists = await this.getCart(userId);

    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (cartExists) {
      let cartItem = await this.prisma.cartHasProduct.findFirst({
        where: {
          cartId: cartExists.id,
          productId,
        },
      });

      if (!cartItem) {
        cartItem = await this.prisma.cartHasProduct.create({
          data: {
            productPrice: product.price,
            quantity: 1,
            productId: productId,
            cartId: cartExists.id,
          },
        });
      } else {
        await this.prisma.cartHasProduct.update({
          where: {
            id: cartItem.id,
          },
          data: {
            quantity: cartItem.quantity + 1,
          },
        });
      }

      const cart = await this.prisma.cart.findUnique({
        where: {
          id: cartExists.id,
        },
        include: {
          items: true,
        },
      });
      return cart;
    }

    const cart = await this.prisma.cart.create({
      data: {
        userId,
        closed: false,
        items: {
          create: {
            productPrice: product.price,
            quantity: 1,
            product: {
              connect: { id: productId },
            },
          },
        },
      },
      include: {
        items: true,
      },
    });

    return cart;
  }

  async getAllCarts(userId) {
    const carts = await this.prisma.cart.findMany({
      where: { userId, closed: true },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return carts;
  }

  async getCart(userId) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId,
        OR: [{ closed: false }, { closed: null }],
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return cart;
  }

  async updateCart({ userId, productId, quantity, closed }) {
    const cartExists = await this.getCart(userId);
    let cartItem = await this.prisma.cartHasProduct.findFirst({
      where: { cartId: cartExists.id, productId },
    });
    if (cartItem) {
      await this.prisma.cartHasProduct.update({
        where: { id: cartItem.id },
        data: {
          quantity,
        },
      });
    } else {
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });
      cartItem = await this.prisma.cartHasProduct.create({
        data: {
          productId,
          cartId: cartExists.id,
          quantity: quantity || 1,
          price: product.price,
        },
      });
    }

    if (typeof closed === "boolean") {
      const cartItems = await this.prisma.cartHasProduct.findMany({
        where: { cartId: cartExists.id },
      });
      const total = cartItems.reduce(
        (acc, curr) => acc + curr.productPrice * curr.quantity,
        3
      );

      await this.prisma.cart.update({
        where: { id: cartExists.id },
        data: {
          closed,
          closedAt: closed ? new Date() : null,
          total: total,
        },
      });

      const cart = this.getCart(userId);

      return cart;
    }
  }

  async deleteCartItem({ userId, productId }) {
    const cart = await this.getCart(userId);
    const cartItem = await this.prisma.cartHasProduct.findFirst({
      where: { cartId: cart.id, productId },
    });

    await this.prisma.cartHasProduct.delete({
      where: { id: cartItem.id },
    });
  }
}
