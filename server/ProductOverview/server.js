const express = require('express');
const app = express();
const { TOKEN } = require('./config.js');
const port = 4000;
const db = require('./database/index.js');

app.use(express.json());


app.get('/products', (req, res) => {
  res.send('Hello, World!');
});



app.listen(port, () => {
  console.log('Listening on port ', port);
});
