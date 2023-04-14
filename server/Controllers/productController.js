const model = require('../Models/productModel');
const db = require('../db');

module.exports = {
  getStylesJSON: async (req, res) => {
    const client = await db.pool.connect();
    try {
      const styles = await model.getStylesJSON(req.params.product_id, client);
      res.status(200).send(styles);
    } catch (error) {
      console.log('getStylesJSON', error);
      res.status(404).send(error);
    }
    client.release();
  },
  getRelated: async (req, res) => {
    try {
      const related = await model.getRelated(req.params.product_id);
      res.status(200).send(related);
    } catch (error) {
      console.log('getRelated', error);
      res.status(404).send(error);
    }
  },
  getOneJSON: async (req, res) => {
    try {
      const product = await model.getOneJSON(req.params.product_id);
      res.status(200).send(product);
    } catch (error) {
      console.log('getOneJSON', error);
      res.status(404).send(error);
    }
  },
  getAll: async (req, res) => {
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    try {
      const allProducts = await model.getAll(page, count);
      res.status(200).send(allProducts);
    } catch (error) {
      console.log('getAll', error);
      res.status(404).send(error);
    }
  },
};
