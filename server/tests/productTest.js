import http from 'k6/http';
import { sleep } from 'k6';

const productIndexes = () => {
  const range = 900000;
  const min = 1;
  return Math.round(Math.random() * range + min);
};

export const options = {
  scenarios: {
    my_scenario1: {
      executor: 'constant-arrival-rate',
      duration: '30s', // total duration
      preAllocatedVUs: 6000, // to allocate runtime resources

      rate: 3000, // number of constant iterations given `timeUnit`
      timeUnit: '1s',
    },
  },
};

export default function () {
  const id = productIndexes();
  http.get(`http://localhost:8080/api/products/${id}`);
  sleep(0.1);
}
