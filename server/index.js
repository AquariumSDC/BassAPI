require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const productRouter = require('./Routes/productRoutes');
const cartRouter = require('./Routes/cartRoutes');

const db = require('./db');

// db.connect();
// db.build();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.get('/', (req, res) => {
  res.json({ info: 'CoralAPI for product information' });
});
app.get('/loaderio-8275ffc7959a37e3b9fbecabaf6283a3', (req, res) => {
  res.send('loaderio-8275ffc7959a37e3b9fbecabaf6283a3');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
