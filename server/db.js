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

  await pool.query("DROP TABLE product");

  await pool.query('CREATE TABLE IF NOT EXISTS product (product_id INTEGER NULL DEFAULT NULL, name VARCHAR(50) NOT NULL, slogan VARCHAR(200) NULL DEFAULT NULL, description VARCHAR(500) DEFAULT NULL, category VARCHAR(25) DEFAULT NULL, default_price DECIMAL(10, 2) DEFAULT NULL, PRIMARY KEY (product_id))');

  await pool.query("COPY product FROM '/Library/product.csv' DELIMITER ',' CSV");

  await pool.query('CREATE TABLE IF NOT EXISTS product_features (product_id INTEGER NULL DEFAULT NULL, feature INTEGER NULL DEFAULT NULL, PRIMARY KEY (product_id))');

  await pool.query('CREATE TABLE IF NOT EXISTS features (feature_id INTEGER NULL DEFAULT NULL, feature VARCHAR(20) NULL DEFAULT NULL, value VARCHAR(20) NULL DEFAULT NULL, PRIMARY KEY (feature_id))');

  await pool.query('CREATE TABLE IF NOT EXISTS features (product_id INTEGER NULL AUTO_INCREMENT DEFAULT NULL, results INTEGER NULL DEFAULT NULL, PRIMARY KEY (product_id), KEY (product_id))');

  await pool.query('CREATE TABLE IF NOT EXISTS results (`style_id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL, name VARCHAR(20) NULL DEFAULT NULL, original_price DECIMAL((10, 2)) NULL DEFAULT NULL, sale_price DECIMAL((10, 2)) NULL DEFAULT NULL, photos SET NULL DEFAULT NULL, skus INTEGER NULL DEFAULT NULL, default? BIT NULL DEFAULT NULL, PRIMARY KEY (style_id))');

  const rows = await pool.query('SELECT * FROM product');
  console.log(rows.rows);
};

connect();

// db.queryAsync('CREATE TABLE IF NOT EXISTS users (id INT NOT NULL PRIMARY KEY, sessionId VARCHAR(50) UNIQUE)')
//   .then((result) => {
//     console.log(result);
//   })
//   .then(() => {
//     // COPY products FROM '/path/to/csv/products' DELIMITER ',' CSV;
//     return db.queryAsync('SELECT * FROM users');
//   })
//   .then((ret) => {
//     console.log(ret.rows)
//   });

module.exports = pool;
