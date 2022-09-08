const debug = require('debug')('app:startup');
const config = require("config")
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const home = require('./routes/home')
const customers = require('./routes/customers');
const orders = require('./routes/orders');
const details = require('./routes/orderDetails');
const products = require('./routes/products');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);
app.use('/api/customers', customers);
app.use('/api/orders', orders);
app.use('/api/details', details);
app.use('/api/products', products);

console.log('Application Name: ' + config.get('name'));

if(app.get('env') == 'development')
{
    app.use(morgan('tiny'));
    debug('Mogran enabled..');
}

if(app.get('env') == 'production')
{
    app.use(morgan('tiny'));
    debug('Mogran enabled..');
}

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`));