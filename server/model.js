const db = require('./db');

module.exports = {
  getStyles: async (productId) => {
    // const queryString = `SELECT * FROM styles WHERE product_id=${productId}`;
    const queryString = `SELECT jsonb_build_object('style_id', style_id, 'name', name, 'original_price', original_price, 'sale_price', sale_price, 'default?', default?, 'photos', (SELECT jsonb_agg(jsonb_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) FROM photos WHERE style_id=style.style_id) AS style FROM styles WHERE product_id=${productId}`;
    const styles = await db.pool.query(queryString);
    return { product_id: productId, results: styles.rows };
  },
  getRelated: async (productId) => {
    const queryString = `SELECT * FROM related WHERE product_id=${productId}`;
    const related = await db.pool.query(queryString);
    return related.rows;
  },
  getOne: async (productId) => {
    const queryString = `SELECT jsonb_build_object('id', id, 'name', name, 'slogan', slogan, 'description', description, 'category', category, 'default_price', default_price, 'features', (SELECT jsonb_agg(jsonb_build_object('feature', feature, 'value', value)) FROM features WHERE product_id=${productId})) FROM product WHERE id=${productId}`;
    const product = await db.pool.query(queryString);

    return product.rows[0].jsonb_build_object;
  },
  getAll: async (page, count) => {
    const queryString = `SELECT * FROM product LIMIT ${count} OFFSET ${(page - 1) * count}`;
    const styles = await db.pool.query(queryString);
    return styles.rows;
  },
};
