const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use(express.static('public'));
app.use('/favicon.ico', express.static('images/favicon.ico'));

app.get('/', (req, res) => {
  res.render('main');
})

app.get('/register', (req, res) => {
  res.render('register');
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${ port }`));