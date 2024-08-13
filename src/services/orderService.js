const Order = require('../models/Order');

class OrderService {
  async createOrder(orderData) {
    const order = new Order(orderData);
    return await order.save();
  }

  async getOrdersByUser(userId) {
    return await Order.find({ user: userId }).populate('pizzas.pizza');
  }

  async getOrderById(id) {
    return await Order.findById(id).populate('pizzas.pizza');
  }

  async updateOrderStatus(id, status) {
    return await Order.findByIdAndUpdate(id, { status }, { new: true });
  }
}

module.exports = new OrderService();