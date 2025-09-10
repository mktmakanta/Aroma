const express = require('express');
const cors = require('cors');
const AppError = require('./utils/appError');
const morgan = require('morgan');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemsRoutes = require('./routes/orderItems');
const reviewRoutes = require('./routes/reviewRoutes');
const tagRoutes = require('./routes/tagRoutes');
const errorController = require('./controllers/errorController');

const app = express();

// ----------------MIDDLEWARES-------------
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

// ERROR HANDLERS

app.all('/*splat', (req, res, next) => {
  //using * as global route is not supported in express v5, we use /*splat
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(errorController);

module.exports = app;
