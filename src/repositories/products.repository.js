import { PrismaClient } from "@prisma/client";

export class ProductsRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createProduct({ name, price, img }) {
    const product = await this.prisma.product.create({
      data: {
        name,
        price,
        img,
      },
    });
    return product;
  }

  async getAllProducts() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  getProduct = async (id) => {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    return product;
  };

  async updateProduct({ id, name, price, img }) {
    const product = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        img,
      },
    });

    return product;
  }

  async deleteProduct(id) {
    await this.prisma.product.delete({ where: { id } });
  }

  async getById(id) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    return product;
  }
}
