const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemsRoutes = require('./routes/orderItems');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/order-item', orderItemsRoutes);
app.use('/api/v1/review', reviewRoutes);

module.exports = app;
