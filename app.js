var express = require('express');
var yf2Logic = require('./logic/yf2Logic');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  yf2Logic.test2()
});