const express = require('express');
const OrderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/', authMiddleware, OrderController.createOrder);
router.get('/', authMiddleware, OrderController.getOrdersByUser);
router.get('/:id', authMiddleware, OrderController.getOrderById);
router.put('/:id/status', [authMiddleware, adminMiddleware], OrderController.updateOrderStatus);

module.exports = router;