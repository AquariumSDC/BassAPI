const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
});

// console.log(pool.totalCount);
// console.log(pool.idleCount);

const connectDB = async () => {
  await pool.connect();
};

const closeDB = () => pool.end().then(() => console.log('pool has ended'));

const buildDB = async () => {
  // Comment these in production?
  await pool.query('DROP TABLE IF EXISTS product CASCADE');
  await pool.query('DROP TABLE IF EXISTS styles CASCADE');
  await pool.query('DROP TABLE IF EXISTS skus CASCADE');
  await pool.query('DROP TABLE IF EXISTS photos CASCADE');
  await pool.query('DROP TABLE IF EXISTS features CASCADE');
  await pool.query('DROP TABLE IF EXISTS related CASCADE');

  // Create product table
  await pool.query('CREATE TABLE IF NOT EXISTS product (id INTEGER NULL DEFAULT NULL, name VARCHAR(50) NOT NULL, slogan VARCHAR(200) NULL DEFAULT NULL, description VARCHAR(500) DEFAULT NULL, category VARCHAR(25) DEFAULT NULL, default_price DECIMAL(10, 2) DEFAULT NULL, PRIMARY KEY (id))');

  // Create styles table
  await pool.query('CREATE TABLE IF NOT EXISTS styles (style_id INTEGER NULL DEFAULT NULL, product_id INTEGER NULL DEFAULT NULL, name VARCHAR(50) NULL DEFAULT NULL, sale_price INTEGER NULL DEFAULT NULL, default_price INTEGER NULL DEFAULT NULL, default_style INTEGER NULL DEFAULT NULL, PRIMARY KEY (style_id))');

  // Create skus table
  await pool.query('CREATE TABLE IF NOT EXISTS skus (sku_id INTEGER NULL DEFAULT NULL, style_id INTEGER NULL DEFAULT NULL, size VARCHAR(15) NULL DEFAULT NULL, quantity INTEGER NULL DEFAULT NULL, PRIMARY KEY (sku_id), FOREIGN KEY(style_id) REFERENCES styles(style_id))');

  // Create photos table
  await pool.query('CREATE TABLE IF NOT EXISTS photos (photo_id INTEGER NULL DEFAULT NULL, style_id INTEGER NULL DEFAULT NULL, url VARCHAR NULL DEFAULT NULL, thumbnail_url VARCHAR NULL DEFAULT NULL, PRIMARY KEY (photo_id), FOREIGN KEY(style_id) REFERENCES styles(style_id))');

  // Create photos table
  await pool.query('CREATE TABLE IF NOT EXISTS features (feature_id INTEGER NULL DEFAULT NULL, product_id INTEGER NULL DEFAULT NULL, feature VARCHAR(25) NULL DEFAULT NULL, value VARCHAR(40) NULL DEFAULT NULL, PRIMARY KEY (feature_id), FOREIGN KEY(product_id) REFERENCES product(id))');

  // Create related table
  await pool.query('CREATE TABLE IF NOT EXISTS related (related_id INTEGER NULL DEFAULT NULL, current_product_id INTEGER NULL DEFAULT NULL, related_product_id INTEGER NULL DEFAULT NULL, PRIMARY KEY (related_id))');

  // Create Indexes
  await pool.query('CREATE INDEX style_index ON styles(product_id)');
  await pool.query('CREATE INDEX photo_index ON photos(style_id)');
  await pool.query('CREATE INDEX sku_index ON skus(style_id)');
  await pool.query('CREATE INDEX product_index ON product(id)');
  await pool.query('CREATE INDEX features_index ON features(product_id)');
  await pool.query('CREATE INDEX related_index ON related(product_id)');

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

  // COPY existing data into table
  await pool.query("COPY features FROM '/Library/features.csv' DELIMITER ','  NULL AS 'null' CSV HEADER");

  // const rows = await pool.query('SELECT * FROM photos');
  // console.log(rows.rows);
};

module.exports.pool = pool;
module.exports.connect = connectDB;
module.exports.build = buildDB;
module.exports.close = closeDB;
