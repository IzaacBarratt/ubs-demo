const express = require("express");
const app = express();
const port = 8080;

const data = require('./data');

app.get("/data", (req, res) => {
  // Was getting cors blocked policy when usting fetch - so added access header
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json(data);
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
