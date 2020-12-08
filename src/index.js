const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const sortMiddleware = require('./app/middlewares/SortMiddleware');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect DB
db.connect();

// Conf thư mục file tĩnh
app.use(express.static(path.join(__dirname, 'public')));
console.log('url: ', path.join(__dirname, 'public'));

// Apply middleware
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Custom middleware
app.use(sortMiddleware);

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  handlebars({
    /* config */
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
          default: 'fas fa-sort',
          asc: 'fas fa-sort-amount-up',
          desc: 'fas fa-sort-amount-down',
        };
        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };
        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`;
      },
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// routes init
route(app);

app.listen(port, () =>
  console.log(`App listening at https://localhost:${port}`),
);
