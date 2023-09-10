const db = require('../db');

module.exports = {
  getStylesJSON: async (productId, client) => {
    const query = {
      text: `
    SELECT
      s.product_id AS product_id,
      jsonb_agg(
        jsonb_build_object(
          'style_id', s.style_id,
          'name', s.name,
          'original_price', s.default_price,
          'sale_price', s.sale_price,
          'default?', s.default_style,
          'photos', (
            SELECT jsonb_agg(
              jsonb_build_object(
                'thumbnail_url', p.thumbnail_url,
                'url', p.url
              )
            )
            FROM photos p
            WHERE p.style_id = s.style_id
          ),
          'skus', (
            SELECT jsonb_object_agg(
              sku_id::text,
              jsonb_build_object(
                'quantity', sku.quantity,
                'size', sku.size
              )
            )
            FROM skus sku
            WHERE sku.style_id = s.style_id
          )
        )
      ) AS results
    FROM styles s
    WHERE s.product_id = $1
    GROUP BY s.style_id, s.product_id
    ORDER BY s.style_id ASC;
  `,
      values: [productId],
    };
    try {
      const styles = await client.query(query);
      return styles.rows;
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
