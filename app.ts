import express from 'express';
import { yf2Calls } from './services/yf2';
import fetchAndCompareEBITDA from './logic/logic';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
  // yf2Logic.test2();
  yf2Calls.expectedPrice("AAPL", 2)
  fetchAndCompareEBITDA("IP", "SUZ", "SLVM", "CLW")
});