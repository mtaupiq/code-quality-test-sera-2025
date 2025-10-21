import { Request, Response, NextFunction } from "express";
import productService from "../services/productService";

/**
 * Create a new product
 * @route POST /api/v1/products
 */
export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    const errorMessage = (error as Error).message || "Error creating product";
    res.status(400).json({
      success: false,
      error: errorMessage,
    });
  }
};

/**
 * Get all products with optional filtering
 * @route GET /api/v1/products
 */
export const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await productService.getAllProducts();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    const errorMessage = (error as Error).message || "Error fetching products";
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};

/**
 * Get a single product by ID
 * @route GET /api/v1/products/:id
 */
export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      res.status(404).json({
        success: false,
        error: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    const errorMessage = (error as Error).message || "Error fetching product";
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};

/**
 * Update an existing product
 * @route PUT /api/v1/products/:id
 */
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.updateProduct(id, req.body);

    res.status(200).json({
      success: true,
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    const errorMessage = (error as Error).message || "Error updating product";

    if (errorMessage.includes("not found")) {
      res.status(404).json({
        success: false,
        error: errorMessage,
      });
    } else {
      res.status(500).json({
        success: false,
        error: errorMessage,
      });
    }
  }
};

/**
 * Delete a product
 * @route DELETE /api/v1/products/:id
 */
export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    const errorMessage = (error as Error).message || "Error deleting product";

    if (errorMessage.includes("not found")) {
      res.status(404).json({
        success: false,
        error: errorMessage,
      });
    } else {
      res.status(500).json({
        success: false,
        error: errorMessage,
      });
    }
  }
};

const validateProductData = (data: any): boolean => {
  return data && data.name && data.price;
};
