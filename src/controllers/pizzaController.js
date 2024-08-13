const PizzaService = require('../services/pizzaService');

class PizzaController {
  async getAllPizzas(req, res) {
    try {
      const pizzas = await PizzaService.getAllPizzas();
      res.json(pizzas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPizzaById(req, res) {
    try {
      const pizza = await PizzaService.getPizzaById(req.params.id);
      if (!pizza) return res.status(404).json({ error: 'Pizza não encontrada' });
      res.json(pizza);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createPizza(req, res) {
    try {
      const pizza = await PizzaService.createPizza(req.body);
      res.status(201).json(pizza);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updatePizza(req, res) {
    try {
      const pizza = await PizzaService.updatePizza(req.params.id, req.body);
      if (!pizza) return res.status(404).json({ error: 'Pizza não encontrada' });
      res.json(pizza);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletePizza(req, res) {
    try {
      const pizza = await PizzaService.deletePizza(req.params.id);
      if (!pizza) return res.status(404).json({ error: 'Pizza não encontrada' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PizzaController();