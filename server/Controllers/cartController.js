const model = require('../Models/cartModel');
const db = require('../db');

module.exports = {
  getAll: async (req, res) => {
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    try {
      const allProducts = await model.getAll(page, count);
      res.status(200).send(allProducts);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  },
};
