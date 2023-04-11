import http from 'k6/http';
import { sleep } from 'k6';

const productIndexes = () => {
  const range = 100000;
  const min = 1;
  return Math.round(Math.random() * range + min);
};

export const options = {
  scenarios: {
    my_scenario1: {
      executor: 'constant-arrival-rate',
      duration: '30s', // total duration
      preAllocatedVUs: 3000, // to allocate runtime resources

      rate: 1000, // number of constant iterations given `timeUnit`
      timeUnit: '1s',
    },
  },
};

export default function () {
  const id = productIndexes();
  http.get('http://localhost:8080/api/products');
  sleep(0.2);
  http.get(`http://localhost:8080/api/products/${id}`);
  sleep(0.2);
  http.get(`http://localhost:8080/api/products/${id}/styles`);
  sleep(0.2);
  http.get(`http://localhost:8080/api/products/${id}/related`);
  sleep(0.2);
}
