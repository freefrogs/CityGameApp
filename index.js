require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const basicDebug = require('debug')('app:startup');
const dbDebug = require('debug')('app:db');
const morgan = require('morgan');

const team = require('./routes/teams');

const app = express();


if (app.get('env') === 'production') {
  require('./middleware/prod')(app);
}

const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_DATABASE_ADDRESS}/${process.env.DB_DATABASE_NAME}`;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => dbDebug('Connected to MongoDB...'))
  .catch((err) => {
    dbDebug('Could not connect to MongoDB.', err.message);
  });

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  basicDebug('Morgan enabled...');
}

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use(express.static('public'));
app.use('/favicon.ico', express.static('images/favicon.ico'));
app.use(express.urlencoded({
  extended: true,
}));

app.get('/', (req, res) => {
  res.render('main');
})

app.get('/login', (req, res) => {
  res.render('login');
})

app.use('/register', team);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${ port }`));