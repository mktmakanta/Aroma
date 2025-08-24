const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');

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

module.exports = app;
