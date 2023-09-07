import http from 'k6/http';
import { sleep } from 'k6';

const productIndexes = () => {
  const range = 1000000;
  const min = 990000;
  return Math.round(Math.random() * range + min);
};

export const options = {
  scenarios: {
    my_scenario1: {
      // executor: 'constant-arrival-rate',
      // duration: '30s', // total duration
      // preAllocatedVUs: 300, // to allocate runtime resources

      // rate: 20000, // number of constant iterations given `timeUnit`
      // timeUnit: '1s',
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 30 },
        { duration: '10s', target: 0 },
      ],
      gracefulRampDown: '0s',
      // rate: 1000,
      // timeUnit: '1s',
    },
  },
};

export default function () {
  const id = productIndexes();
  // http.get('http://localhost:8080/api/products');

  // http.get(`http://localhost:8080/api/products/${id}`);

  http.get(`http://localhost:8080/api/products/${id}/styles`);

  // http.get(`http://localhost:8080/api/products/${id}/related`);
}
