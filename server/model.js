const db = require('./db');

module.exports = {
  getStyles: async (productId) => {
    const queryString = `SELECT * FROM styles WHERE product_id=${productId}`;
    const styles = await db.pool.query(queryString);
    return styles.rows;
  },
  getPhotos: async (styleId) => {
    const queryString = `SELECT thumbnail_url, url FROM photos WHERE photos.style_id=${styleId}`;
    const photos = await db.pool.query(queryString);
    return photos.rows;
  },
  getSkus: async (styleId) => {
    const queryString = `SELECT sku_id, quantity, size FROM skus WHERE style_id=${styleId}`;
    const skus = await db.pool.query(queryString);
    return skus.rows;
  },
  getRelated: async (productId) => {
    const queryString = `SELECT jsonb_agg((related_product_id)) FROM related WHERE current_product_id=${productId}`;
    const related = await db.pool.query(queryString);
    return related.rows[0].jsonb_agg;
  },
  getOne: async (productId) => {
    // const queryString = `SELECT json_build_object('id', id, 'name', name, 'slogan', slogan, 'description', description, 'category', category, 'default_price', default_price, 'features', (SELECT json_agg(json_build_object('feature', feature, 'value', value)) FROM features WHERE product_id=${productId})) FROM product WHERE id=${productId}`;
    const queryString = `SELECT * FROM product WHERE id=${productId}`;
    const product = await db.pool.query(queryString);
    return product.rows[0];
  },
  getFeatures: async (productId) => {
    const queryString = `SELECT feature, value FROM features WHERE product_id=${productId}`;
    const features = await db.pool.query(queryString);
    return features.rows;
  },
  getAll: async (page, count) => {
    const queryString = `SELECT * FROM product LIMIT ${count} OFFSET ${(page - 1) * count}`;
    const styles = await db.pool.query(queryString);
    return styles.rows;
  },
};
