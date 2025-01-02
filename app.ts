import express from 'express';
import { yf2Logic } from './logic/yf2Logic';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
  yf2Logic.test2();
});