const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());

app.get('/', (req, res) => {
  res.render('main');
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${ port }`));