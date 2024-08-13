const Pizza = require('../models/Pizza');

class PizzaService {
  async getAllPizzas() {
    return await Pizza.find();
  }

  async getPizzaById(id) {
    return await Pizza.findById(id);
  }

  async createPizza(pizzaData) {
    const pizza = new Pizza(pizzaData);
    return await pizza.save();
  }

  async updatePizza(id, pizzaData) {
    return await Pizza.findByIdAndUpdate(id, pizzaData, { new: true });
  }

  async deletePizza(id) {
    return await Pizza.findByIdAndDelete(id);
  }
}

module.exports = new PizzaService();