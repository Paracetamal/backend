const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importing routes
const homeRouter = require('./routes/homeRouter')
const adminRouter = require('./routes/adminRouter')
const clientsRouter = require('./routes/clientsRouter')
const productsRouter = require('./routes/productsRouter')
const ordersRouter = require('./routes/ordersRouter')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.use(cors({ origin: '*' }));


app.use('/', homeRouter)
app.use('/admin', adminRouter)
app.use('/clients', clientsRouter)
app.use('/products', productsRouter)
app.use('/orders', ordersRouter)

module.exports = app;
