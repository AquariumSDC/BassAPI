const model = require('./model');

module.exports = {
  getStyles: async (req, res) => {
    const styles = await model.getStyles(req.params.product_id);
    res.status(200).send(styles);
  },
  getRelated: async (req, res) => {
    const related = await model.getRelated(req.params.product_id);
    res.status(200).send(related);
  },
  getOne: async (req, res) => {
    const product = await model.getOne(req.params.product_id);
    res.status(200).send(product);
  },
  getAll: async (req, res) => {
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const allProducts = await model.getAll(page, count);
    res.status(200).send(allProducts);
  },
};
