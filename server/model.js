const db = require('./db');

module.exports = {
  getStyles: async (productId) => {
    const queryString = `SELECT * FROM styles WHERE product_id=${productId}`;
    const styles = await db.pool.query(queryString);
    return styles.rows;
  },
  getRelated: async (productId) => {
    const queryString = `SELECT * FROM related WHERE product_id=${productId}`;
    const related = await db.pool.query(queryString);
    return related.rows;
  },
  getOne: async (productId) => {
    const productQueryString = `SELECT * FROM product WHERE id=${productId}`;
    const featuresQueryString = `SELECT (feature, value) FROM features WHERE product_id=${productId}`;

    const product = await db.pool.query(productQueryString);
    const features = await db.pool.query(featuresQueryString);
    console.log(features.rows[0].row)
    return product.rows;
  },
  getAll: async (page, count) => {
    const queryString = `SELECT * FROM product LIMIT ${count} OFFSET ${(page - 1) * count}`;
    const styles = await db.pool.query(queryString);
    return styles.rows;
  },
};
