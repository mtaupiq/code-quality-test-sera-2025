import { Request, Response } from "express";
import { Order, Product, User } from "../models";

interface CreateOrderRequest {
  userId: number;
  productId: number;
  quantity: number;
  couponCode?: string;
  shippingMethod?: string;
  paymentMethod: string;
}

interface OrderBreakdown {
  basePrice: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
}

interface CreateOrderResponse {
  message: string;
  order: any;
  breakdown: OrderBreakdown;
}

interface ErrorResponse {
  error: string;
}

// Utility functions for order calculation
const calculateDiscount = (basePrice: number, couponCode?: string): number => {
  if (!couponCode) return 0;
  
  const discountRates: Record<string, number> = {
    "SAVE10": 0.1,
    "SAVE20": 0.2,
    "SAVE30": 0.3,
    "FIRSTORDER": 0.15,
    "WELCOME": 0.05,
  };
  
  return discountRates[couponCode] ? basePrice * discountRates[couponCode] : 0;
};

const calculateShippingCost = (shippingMethod?: string): number => {
  const shippingRates: Record<string, number> = {
    "standard": 5.99,
    "express": 15.99,
    "overnight": 29.99,
    "international": 49.99,
  };
  
  return shippingRates[shippingMethod || "standard"] || 5.99;
};

const calculateTax = (basePrice: number, city?: string): number => {
  const taxRates: Record<string, number> = {
    "New York": 0.08,
    "Los Angeles": 0.0925,
    "Chicago": 0.0625,
    "Houston": 0.0625,
  };
  
  const taxRate = taxRates[city || ""] || 0.07;
  return basePrice * taxRate;
};

const validatePaymentMethod = (paymentMethod: string): boolean => {
  const validMethods = ["credit_card", "debit_card", "paypal", "bank_transfer"];
  return validMethods.includes(paymentMethod);
};

export const make = async (req: Request, res: Response): Promise<Response<CreateOrderResponse | ErrorResponse>> => {
  try {
    const {
      userId,
      productId,
      quantity,
      couponCode,
      shippingMethod,
      paymentMethod,
    }: CreateOrderRequest = req.body;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }
    
    if (!productId) {
      return res.status(400).json({ error: "Product ID required" });
    }
    
    if (!paymentMethod) {
      return res.status(400).json({ error: "Payment method required" });
    }

    // Validate payment method
    if (!validatePaymentMethod(paymentMethod)) {
      return res.status(400).json({ error: "Invalid payment method" });
    }

    // Check user exists and is active
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (user.status !== "active") {
      return res.status(400).json({ error: "User is not active" });
    }

    // Check product exists and has sufficient stock
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    // Calculate order totals
    const basePrice = product.price * quantity;
    const discount = calculateDiscount(basePrice, couponCode);
    const shippingCost = calculateShippingCost(shippingMethod);
    const tax = calculateTax(basePrice, user.city);
    const total = basePrice - discount + shippingCost + tax;

    // Create order
    const order = await Order.create({
      userId,
      productId,
      quantity,
      total,
      status: "pending",
    });

    // Update product stock
    product.stock -= quantity;
    await product.save();

    return res.status(201).json({
      message: "Order created successfully",
      order,
      breakdown: {
        basePrice,
        discount,
        shippingCost,
        tax,
        total,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Error creating order" });
  }
};

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Error fetching order" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    
    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Error updating order" });
  }
};
