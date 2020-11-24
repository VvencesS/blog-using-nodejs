const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

// Conf thư mục file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars({
    /* config */
    extname: '.hbs'
}));
app.set('view engine', 'hbs'); 
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(3000);