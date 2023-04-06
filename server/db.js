const { Client } = require('pg');

const pool = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
});

const connect = async () => {
  await pool.connect();

  await pool.query('DROP TABLE IF EXISTS product');
  await pool.query('DROP TABLE IF EXISTS styles');
  await pool.query('DROP TABLE IF EXISTS skus');
  await pool.query('DROP TABLE IF EXISTS photos');

  // Create product table
  await pool.query('CREATE TABLE IF NOT EXISTS product (product_id INTEGER NULL DEFAULT NULL, name VARCHAR(50) NOT NULL, slogan VARCHAR(200) NULL DEFAULT NULL, description VARCHAR(500) DEFAULT NULL, category VARCHAR(25) DEFAULT NULL, default_price DECIMAL(10, 2) DEFAULT NULL, PRIMARY KEY (product_id))');

  // product_features table
  await pool.query('CREATE TABLE IF NOT EXISTS product_features (product_id INTEGER NULL DEFAULT NULL, feature INTEGER NULL DEFAULT NULL, PRIMARY KEY (product_id))');

  // features table
  await pool.query('CREATE TABLE IF NOT EXISTS features (feature_id INTEGER NULL DEFAULT NULL, feature VARCHAR(20) NULL DEFAULT NULL, value VARCHAR(20) NULL DEFAULT NULL, PRIMARY KEY (feature_id))');

  // styles table
  await pool.query('CREATE TABLE IF NOT EXISTS styles (style_id INTEGER NULL DEFAULT NULL, product_id INTEGER NULL DEFAULT NULL, name VARCHAR(50) NULL DEFAULT NULL, sale_price INTEGER NULL DEFAULT NULL, default_price INTEGER NULL DEFAULT NULL, default_style INTEGER NULL DEFAULT NULL, PRIMARY KEY (style_id))');

  await pool.query('CREATE TABLE IF NOT EXISTS skus (sku_id INTEGER NULL DEFAULT NULL, style_id INTEGER NULL DEFAULT NULL, size VARCHAR(15) NULL DEFAULT NULL, quantity INTEGER NULL DEFAULT NULL)');

  await pool.query('CREATE TABLE IF NOT EXISTS photos (photo_id INTEGER NULL DEFAULT NULL, style_id INTEGER NULL DEFAULT NULL, url VARCHAR NULL DEFAULT NULL, thumbnail_url VARCHAR NULL DEFAULT NULL)');

  await pool.query('CREATE TABLE IF NOT EXISTS related (related_id INTEGER NULL DEFAULT NULL, current_product_id INTEGER NULL DEFAULT NULL, related_product_id INTEGER NULL DEFAULT NULL)');

  // COPY existing data into table
  await pool.query("COPY product FROM '/Library/product.csv' DELIMITER ',' CSV HEADER");

  // COPY existing data into table
  await pool.query("COPY styles FROM '/Library/styles.csv' DELIMITER ',' NULL AS 'null' CSV HEADER");

  // COPY existing data into table
  await pool.query("COPY skus FROM '/Library/skus.csv' DELIMITER ',' CSV HEADER");

  // COPY existing data into table
  await pool.query("COPY photos FROM '/Library/photos.csv' DELIMITER ',' CSV HEADER");

  // COPY existing data into table
  await pool.query("COPY related FROM '/Library/related.csv' DELIMITER ',' CSV HEADER");

  //const rows = await pool.query('SELECT * FROM product');
};

connect();

module.exports = pool;
