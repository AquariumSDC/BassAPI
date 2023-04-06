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
    const queryString = `SELECT * FROM product WHERE product_id=${productId}`;
    const product = await db.pool.query(queryString);
    return product.rows;
  },
  getAll: async (page, count) => {
    const queryString = `SELECT * FROM product LIMIT ${count} OFFSET ${(page - 1) * count}`;
    const styles = await db.pool.query(queryString);
    return styles.rows;
  },
};
