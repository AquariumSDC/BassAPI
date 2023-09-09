const db = require('../db');

module.exports = {
  getStylesJSON: async (productId, client) => {
    // q: How do i solve the check ungrouped columns walker error below?
    // a: https://stackoverflow.com/questions/47263673/ungrouped-columns-error-in-postgresql
    const query = {
      text: "SELECT jsonb_agg(jsonb_build_object('style_id', style_id, 'name', name, 'original_price', default_price, 'sale_price', sale_price, 'default?', default_style, 'photos', (SELECT jsonb_agg(jsonb_build_object('thumbnail_url', thumbnail_url, 'url', url)) FROM photos WHERE photos.style_id=styles.style_id), 'skus', (SELECT jsonb_object_agg(sku_id, jsonb_build_object('quantity', quantity, 'size', size)) FROM skus WHERE skus.style_id=styles.style_id))) FROM styles WHERE product_id=$1;",
      values: [productId],
    };
    try {
      const styles = await client.query(query);
      return { product_id: productId, results: styles.rows[0].jsonb_agg };
    } catch (err) {
      return err;
    }
  },

  getRelated: async (productId) => {
    const query = {
      text: 'SELECT jsonb_agg((related_product_id)) FROM related WHERE current_product_id=$1',
      values: [productId],
    };
    try {
      const client = await db.pool.connect();
      const related = await client.query(query);
      client.release();
      return related.rows[0].jsonb_agg;
    } catch (err) {
      return err;
    }
  },
  getOneJSON: async (productId) => {
    const query = {
      text: "SELECT jsonb_build_object('id', id, 'name', name, 'slogan', slogan, 'description', description, 'category', category, 'default_price', default_price, 'features', (SELECT jsonb_agg(jsonb_build_object('feature', feature, 'value', value)) FROM features WHERE product_id=$1)) FROM product WHERE id=$1",
      values: [productId],
    };
    try {
      const client = await db.pool.connect();
      const product = await client.query(query);
      client.release();
      return product.rows[0].jsonb_build_object;
    } catch (err) {
      return err;
    }
  },

  getAll: async (page, count) => {
    const queryString = {
      text: 'SELECT * FROM product LIMIT $1 OFFSET $2',
      values: [page, (page - 1) * count],
    };
    try {
      const client = await db.pool.connect();
      const styles = await client.query(queryString);
      client.release();
      return styles.rows;
    } catch (err) {
      return err;
    }
  },
};
