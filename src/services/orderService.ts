import Order from "../models/Order";
import Product from "../models/Product";
import User from "../models/User";

export class OrderService {
  async createOrder(orderData: any) {
    var userId = orderData.userId;
    var productId = orderData.productId;
    var quantity = orderData.quantity;
    var couponCode = orderData.couponCode;
    var shippingMethod = orderData.shippingMethod;
    var paymentMethod = orderData.paymentMethod;

    // Check user
    if (userId) {
      var user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }
      if (user.status !== "active") {
        throw new Error("User is not active");
      }
    } else {
      throw new Error("User ID required");
    }

    // Check product
    if (productId) {
      var product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("Product not found");
      }
      if (product.stock < quantity) {
        throw new Error("Insufficient stock");
      }
    } else {
      throw new Error("Product ID required");
    }

    var basePrice = product.price * quantity;
    var discount = 0;
    var shippingCost = 0;
    var tax = 0;

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
      shippingCost = 5.99;
    }

    tax = basePrice * 0.07;
    var total = basePrice - discount + shippingCost + tax;

    const order = await Order.create({
      userId,
      productId,
      quantity,
      total,
      status: "pending",
    });

    // Update stock
    product.stock -= quantity;
    await product.save();

    return {
      order,
      breakdown: {
        basePrice,
        discount,
        shippingCost,
        tax,
        total,
      },
    };
  }

  async getAllOrders() {
    return await Order.findAll();
  }

  async getOrderById(id: any) {
    return await Order.findByPk(id);
  }

  async updateOrderStatus(id: any, status: string) {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error("Order not found");
    }
    order.status = status;
    await order.save();
    return order;
  }
}

export default new OrderService();
