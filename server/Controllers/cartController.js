const model = require('../Models/cartModel');
const db = require('../db');
const { uuid } = require('uuidv4');

module.exports = {
  getCart: async (req, res) => {
    const sessionId = req.cookies.sessionID || null;

    try {
      const allProducts = await model.getCart(sessionId);
      res.status(200).send(allProducts);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  postCart: async (req, res) => {
    const sessionId = req.cookies.sessionID || uuid.v4();
    res.cookie('sessionId', sessionId, { httpOnly: true });

    try {
      const cartProducts = await model.postCart(sessionId, req.body.sku_id);
      res.status(200).send(cartProducts);
    } catch (error) {
      res.status(404).send(error);
    }
  },
};
