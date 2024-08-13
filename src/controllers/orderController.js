const OrderService = require('../services/orderService');

class OrderController {
  async createOrder(req, res) {
    try {
      const orderData = { ...req.body, user: req.user.id };
      const order = await OrderService.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getOrdersByUser(req, res) {
    try {
      const orders = await OrderService.getOrdersByUser(req.user.id);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });
      if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const order = await OrderService.updateOrderStatus(req.params.id, req.body.status);
      if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();