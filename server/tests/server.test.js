/* eslint-disable no-undef */
const request = require('supertest');
const app = require('./testServer');
const db = require('../db');

const server = app.listen(3000);

afterAll(() => {
  server.close();
  db.close();
});

describe('Tests are running properly', () => {
  test('responds to /test', async () => {
    const res = await request(app).get('/test');
    expect(res.statusCode).toBe(200);
  });
});

describe('The server routes correctly', () => {
  test('responds to /api/products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /api/products/:product_id', async () => {
    const res = await request(app).get('/api/products/1');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /api/products/:product_id/styles', async () => {
    const res = await request(app).get('/api/products/1/styles');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /api/products/:product_id/related', async () => {
    const res = await request(app).get('/api/products/1/related');
    expect(res.statusCode).toBe(200);
  });
});

describe('The model returns the correct shape of data', () => {
  test('styles returns an object with product_id and results', async () => {
    const testId = '1';
    const res = await request(app).get(`/api/products/${testId}/styles`);
    expect(res._body.product_id).toBe(testId);
    expect(Array.isArray(res._body.results)).toBeTruthy();
    expect(res.statusCode).toBe(200);
  });
});

describe('The controller handles errors', () => {
  test('Handles products that do not have styles data', async () => {
    const res = await request(app).get('/api/products/79/styles');
    expect(res.text).toBe('There are no styles for this product');
    expect(res.statusCode).toBe(404);
  });
});
