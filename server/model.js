const db = require('./db');

module.exports = {
  getStyles: async (productId, client) => {
    const queryString = `SELECT * FROM styles WHERE product_id=${productId}`;
    const styles = await client.query(queryString);
    return styles.rows;
  },
  getPhotos: async (styleId, client) => {
    const queryString = `SELECT thumbnail_url, url FROM photos WHERE photos.style_id=${styleId}`;
    const photos = await client.query(queryString);
    return photos.rows;
  },
  getSkus: async (styleId, client) => {
    const queryString = `SELECT sku_id, quantity, size FROM skus WHERE style_id=${styleId}`;
    const skus = await client.query(queryString);
    return skus.rows;
  },
  getRelated: async (productId) => {
    const client = await db.pool.connect();
    const queryString = `SELECT jsonb_agg((related_product_id)) FROM related WHERE current_product_id=${productId}`;
    const related = await client.query(queryString);
    client.release();
    return related.rows[0].jsonb_agg;
  },
  getOne: async (productId) => {
    const client = await db.pool.connect();
    const queryString = `SELECT * FROM product WHERE id=${productId}`;
    const product = await client.query(queryString);
    client.release();
    return product.rows[0];
  },
  getFeatures: async (productId) => {
    const client = await db.pool.connect();
    const queryString = `SELECT feature, value FROM features WHERE product_id=${productId}`;
    const features = await client.query(queryString);
    client.release();
    return features.rows;
  },
  getAll: async (page, count) => {
    const client = await db.pool.connect();
    const queryString = `SELECT * FROM product LIMIT ${count} OFFSET ${(page - 1) * count}`;
    const styles = await client.query(queryString);
    client.release();
    return styles.rows;
  },
};
