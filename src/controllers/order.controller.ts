import { Request, Response } from "express";
import Order from "../models/Order";
import Product from "../models/Product";
import User from "../models/User";

export const make = async (req: Request, res: Response) => {
  try {
    var userId = req.body.userId;
    var productId = req.body.productId;
    var quantity = req.body.quantity;
    var couponCode = req.body.couponCode;
    var shippingMethod = req.body.shippingMethod;
    var paymentMethod = req.body.paymentMethod;

    // Check user exists
    if (userId) {
      var user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (user.status !== "active") {
        return res.status(400).json({ error: "User is not active" });
      }
    } else {
      return res.status(400).json({ error: "User ID required" });
    }

    // Check product exists
    if (productId) {
      var product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      if (product.stock < quantity) {
        return res.status(400).json({ error: "Insufficient stock" });
      }
    } else {
      return res.status(400).json({ error: "Product ID required" });
    }

    // Calculate price with complex logic
    var basePrice = product.price * quantity;
    var discount = 0;
    var shippingCost = 0;
    var tax = 0;

    // Coupon code logic
    if (couponCode) {
      if (couponCode === "SAVE10") {
        discount = basePrice * 0.1;
      } else if (couponCode === "SAVE20") {
        discount = basePrice * 0.2;
      } else if (couponCode === "SAVE30") {
        discount = basePrice * 0.3;
      } else if (couponCode === "FIRSTORDER") {
        discount = basePrice * 0.15;
      } else if (couponCode === "WELCOME") {
        discount = basePrice * 0.05;
      }
    }

    // Shipping method logic
    if (shippingMethod) {
      if (shippingMethod === "standard") {
        shippingCost = 5.99;
      } else if (shippingMethod === "express") {
        shippingCost = 15.99;
      } else if (shippingMethod === "overnight") {
        shippingCost = 29.99;
      } else if (shippingMethod === "international") {
        shippingCost = 49.99;
      }
    } else {
      shippingCost = 5.99; // default
    }

    // Tax calculation based on location (hardcoded)
    if (user.city) {
      if (user.city === "New York") {
        tax = basePrice * 0.08;
      } else if (user.city === "Los Angeles") {
        tax = basePrice * 0.0925;
      } else if (user.city === "Chicago") {
        tax = basePrice * 0.0625;
      } else if (user.city === "Houston") {
        tax = basePrice * 0.0625;
      } else {
        tax = basePrice * 0.07;
      }
    } else {
      tax = basePrice * 0.07;
    }

    var total = basePrice - discount + shippingCost + tax;

    // Payment method validation
    if (paymentMethod) {
      if (paymentMethod !== "credit_card" && paymentMethod !== "debit_card" && paymentMethod !== "paypal" && paymentMethod !== "bank_transfer") {
        return res.status(400).json({ error: "Invalid payment method" });
      }
    } else {
      return res.status(400).json({ error: "Payment method required" });
    }

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

    res.status(201).json({
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
    console.error("Error:", error);
    res.status(500).json({ error: "Error creating order" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching order" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      order.status = req.body.status;
      await order.save();
      res.json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating order" });
  }
};
