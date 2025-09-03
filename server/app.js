const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemsRoutes = require('./routes/orderItems');
const reviewRoutes = require('./routes/reviewRoutes');
const tagRoutes = require('./routes/tagRoutes');

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
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/order-items', orderItemsRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/tags', tagRoutes);

app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  res.status(statusCode).json({
    status: status,
    message: err.message,
  });
});

module.exports = app;
