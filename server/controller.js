const model = require('./model');

module.exports = {
  getStyles: async (req, res) => {
    // try {
    //   const styles = await model.getStyles(req.params.product_id);
    //   res.status(200).send(styles);
    // } catch (error) {
    //   res.status(404).send(error);
    // }
    const styles = await model.getStyles(req.params.product_id);
    res.status(200).send(styles);
  },
  getRelated: async (req, res) => {
    try {
      const related = await model.getRelated(req.params.product_id);
      res.status(200).send(related);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  getOne: async (req, res) => {
    try {
      const product = await model.getOne(req.params.product_id);
      res.status(200).send(product);
    } catch (error) {
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
      res.status(404).send(error);
    }
  },
};
