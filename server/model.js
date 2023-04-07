const db = require('./db');

module.exports = {
  getStyles: async (productId) => {
    // const queryString = `SELECT * FROM styles WHERE product_id=${productId}`;
    // skus (SELECT jsonb_agg(jsonb_build_object(sku_id, jsonb_build_object('quantity', quantity, 'size', size))) FROM skus WHERE skus.style_id=styles.style_id)
    const queryString = `SELECT jsonb_agg(jsonb_build_object('style_id', style_id, 'name', name, 'original_price', default_price, 'sale_price', sale_price, 'default?', default_style, 'photos',
    (SELECT jsonb_agg(jsonb_build_object('thumbnail_url', thumbnail_url, 'url', url)) FROM photos WHERE photos.style_id=styles.style_id), 'skus',
    (SELECT jsonb_object_agg(sku_id, jsonb_build_object('quantity', quantity, 'size', size)) FROM skus WHERE skus.style_id=styles.style_id)
   )) FROM styles WHERE product_id=${productId}`;
    const styles = await db.pool.query(queryString);
    return { product_id: productId, results: styles.rows[0].jsonb_agg };
  },
  getRelated: async (productId) => {
    const queryString = `SELECT jsonb_agg((related_product_id)) FROM related WHERE current_product_id=${productId}`;
    const related = await db.pool.query(queryString);
    return related.rows[0].jsonb_agg;
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
