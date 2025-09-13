const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
// const hpp = require('hpp');

const AppError = require('./utils/appError');
const rateLimit = require('express-rate-limit');

const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemsRoutes = require('./routes/orderItems');
const reviewRoutes = require('./routes/reviewRoutes');
const tagRoutes = require('./routes/tagRoutes');
const errorController = require('./controllers/errorController');

const app = express();

// ----------MIDDLEWARES-------------
// These middlewares are arranged hierrachically according to best practice and use
app.use(
  helmet({
    contentSecurityPolicy: false, // disable CSP if not needed
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' })); // parse requests

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Sanitize against XSS/ cross side scripting
app.use(xss());

// prevent parameter pollutions
// app.use(hpp());

// To serve static files
app.use(express.static(`${__dirname}/public`));

// ----------ROUTES-------------
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/order-items', orderItemsRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/tags', tagRoutes);

// --------UNHANDLED ROUTES-----------
app.all('/*splat', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// -----------ERROR HANDLERS-----------
app.use(errorController);

module.exports = app;
