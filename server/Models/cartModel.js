const db = require('../db');

module.exports = {
  getCart: async (sessionId) => {
    const client = await db.pool.connect();
    const queryString = `SELECT * FROM cart WHERE user_session=${sessionId}`;
    const items = await client.query(queryString);
    client.release();
    return items.rows;
  },
  postCart: async (sessionId, productId) => {
    const client = await db.pool.connect();
    const queryString = `INSERT INTO cart (id, user_session, product_id, active) VALUES (NULL, ${sessionId}, ${productId}, 1)`;
    const items = await client.query(queryString);
    client.release();
    return items.rows;
  },
};
