import Product from "../models/Product";

export class ProductRepository {
  async findAll() {
    return await Product.findAll();
  }

  async findById(id: any) {
    return await Product.findByPk(id);
  }

  async findByCategory(category: string) {
    return await Product.findAll({ where: { category } });
  }

  async create(productData: any) {
    return await Product.create(productData);
  }

  async update(id: any, data: any) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.update(data);
    return product;
  }

  async delete(id: any) {
    const product = await Product.findByPk(id);
    if (!product) return false;
    await product.destroy();
    return true;
  }

  async getAllProducts() {
    return await this.findAll();
  }

  async getProductById(id: any) {
    return await this.findById(id);
  }
}

export default new ProductRepository();
