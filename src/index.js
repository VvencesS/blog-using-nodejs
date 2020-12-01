const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect DB
db.connect();

// Conf thư mục file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Apply middleware
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  handlebars({
    /* config */
    extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// routes init
route(app);

app.listen(port, () =>
  console.log(`App listening at https://localhost:${port}`),
);
