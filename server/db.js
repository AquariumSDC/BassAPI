const Pool = require('pg').Pool;
const Promise = require('bluebird');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
});

const db = Promise.promisifyAll(pool);

db.queryAsync('CREATE TABLE IF NOT EXISTS users (id INT NOT NULL PRIMARY KEY, sessionId VARCHAR(50) UNIQUE)')
  .then((result) => {
    console.log(result);
  })
  .then(() => {
    return db.queryAsync('SELECT * FROM users');
  })
  .then((ret) => {
    console.log(ret.rows)
  });


module.exports = pool;
