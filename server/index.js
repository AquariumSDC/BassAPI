require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('./routes');

const db = require('./db');

db.connect();
// db.build();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/products', router);

app.get('/', (request, response) => {
  response.json({ info: 'CoralAPI for product information' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
