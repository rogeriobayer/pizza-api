const express = require('express');
const PizzaController = require('../controllers/pizzaController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/', PizzaController.getAllPizzas);
router.get('/:id', PizzaController.getPizzaById);
router.post('/', [authMiddleware, adminMiddleware], PizzaController.createPizza);
router.put('/:id', [authMiddleware, adminMiddleware], PizzaController.updatePizza);
router.delete('/:id', [authMiddleware, adminMiddleware], PizzaController.deletePizza);

module.exports = router;