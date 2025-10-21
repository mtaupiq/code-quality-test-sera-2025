import Order from "../models/Order";

export class OrderRepository {
  async findAll() {
    return await Order.findAll();
  }

  async findById(id: any) {
    return await Order.findByPk(id);
  }

  async findByUserId(userId: any) {
    return await Order.findAll({ where: { userId } });
  }

  async findByStatus(status: string) {
    return await Order.findAll({ where: { status } });
  }

  async create(orderData: any) {
    return await Order.create(orderData);
  }

  async update(id: any, data: any) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    await order.update(data);
    return order;
  }

  async delete(id: any) {
    const order = await Order.findByPk(id);
    if (!order) return false;
    await order.destroy();
    return true;
  }
}

export default new OrderRepository();
