const request = require('supertest');
const express = require('express');
const router = require('../routes');

const app = express();
app.use(express.json());
app.use('/api/products', router);

beforeAll(done => {
  done()
})

describe('Router routes requests properly', function () {

  test('responds to /products/1', async () => {
    const res = await request(app).get('/api/products/1');
    expect(res.statusCode).toBe(200);
    expect(typeof(res.data.results)).toEqual('array');
  });

  // test('responds to /hello/:name', async () => {
  //   const res = await request(app).get('/hello/jaxnode');
  //   expect(res.header['content-type']).toBe('text/html; charset=utf-8');
  //   expect(res.statusCode).toBe(200);
  //   expect(res.text).toEqual('hello jaxnode!');
  // });

  // test('responds to /hello/Annie', async () => {
  //   const res = await request(app).get('/hello/Annie');
  //   expect(res.header['content-type']).toBe('text/html; charset=utf-8');
  //   expect(res.statusCode).toBe(200);
  //   expect(res.text).toEqual('hello Annie!');
  // });

});
