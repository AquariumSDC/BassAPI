const db = require('../db');

module.exports = {
  getCart: async (sessionId) => {
    const queryString = `SELECT * FROM cart WHERE user_session=${sessionId}`;
    try {
      const client = await db.pool.connect();
      const items = await client.query(queryString);
      client.release();
      return items.rows;
    } catch (err) {
      return err;
    }
  },
  postCart: async (sessionId, productId) => {
    const queryString = `INSERT INTO cart (user_session, product_id, active) VALUES (${sessionId}, ${productId}, 1)`;
    try {
      const client = await db.pool.connect();
      const items = await client.query(queryString);
      client.release();
      return items.rows;
    } catch (err) {
      return err;
    }
  },
};
