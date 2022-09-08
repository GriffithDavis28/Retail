const express = require('express');
const home = express.Router();

home.get('/', (req, res) => {
    res.render('index', {title: 'My Project App', message: 'Hello'});
});

module.exports = home;

