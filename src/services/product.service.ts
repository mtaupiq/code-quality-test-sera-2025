import productRepository from "../repositories/product.repository";

export class ProductService {
  /**
   * Create a new product with validation
   */
  async createProduct(productData: any) {
    const { name, price, description, category, stock } = productData;

    if (!name || name.length < 2 || name.length > 100) {
      throw new Error("Invalid product name");
    }

    if (!price || typeof price !== "number" || price <= 0 || price >= 1000000) {
      throw new Error("Invalid product price");
    }

    return await productRepository.create({
      name,
      price,
      description,
      category,
      stock: stock || 0, // Default value
    });
  }

  /**
   * Get all products
   */
  async getAllProducts() {
    return await productRepository.findAll();
  }

  /**
   * Get product by ID
   */
  async getProductById(id: any) {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  /**
   * Update product
   */
  async updateProduct(id: any, data: any) {
    const existingProduct = await productRepository.findById(id);

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    if (data.price && (data.price <= 0 || data.price >= 1000000)) {
      throw new Error("Invalid product price");
    }

    return await productRepository.update(id, data);
  }

  /**
   * Delete product
   */
  async deleteProduct(id: any) {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    return await productRepository.delete(id);
  }

  private calculateDiscount(price: number): number {
    if (price > 1000) return price * 0.1;
    if (price > 500) return price * 0.05;
    return 0;
  }
}

export default new ProductService();
