const model = require('./model');
const db = require('./db');

module.exports = {
  getStyles: async (req, res) => {
    const client = await db.pool.connect();
    try {
      const styles = await model.getStyles(req.params.product_id, client);
      let photos = [];
      const skus = [];
      for (let i = 0; i < styles.length; i += 1) {
        skus[i] = {};
        photos = await model.getPhotos(styles[i].style_id, client);
        styles[i].photos = photos;

        const allSkus = await model.getSkus(styles[i].style_id, client);
        allSkus.forEach((sku) => {
          skus[i][sku.sku_id] = { size: sku.size, quantity: sku.quantity };
        });
        styles[i].skus = skus[i];
      }

      if (styles.length === 0) {
        res.setHeader('content-type', 'application/json');
        res.status(404).send('Product out of range');
      } else {
        const returnObj = { product_id: req.params.product_id, results: styles };

        res.setHeader('content-type', 'application/json');
        res.status(200).send(returnObj);
      }
    } catch (error) {
      res.status(404).send(error);
    }
    client.release();
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
      const features = await model.getFeatures(req.params.product_id);
      product.features = features;
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
