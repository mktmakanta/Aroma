const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createOrderItem = catchAsync(async (req, res, next) => {
  const query = req.body;

  const productDoc = await Product.findById(query.product);
  if (!productDoc) return next(new AppError('Product not found!', 404));

  const orderItem = await OrderItem.create({
    product: query.product,
    quantity: query.quantity,
    price: productDoc.price * query.quantity,
  });

  res.status(201).json(orderItem);
});

exports.getOrderItems = catchAsync(async (req, res, next) => {
  const orderItems = await OrderItem.find().populate('product', 'name price');
  res.json({
    status: 'success',
    message: 'Order items fetched successfully',
    count: orderItems.length,
    data: {
      product: orderItems,
    },
  });
});

exports.getOrderItemById = catchAsync(async (req, res, next) => {
  const orderItem = await OrderItem.findById(req.params.id).populate(
    'product',
    'name price'
  );

  if (!orderItem) return next(new AppError('Order item not found', 404));

  res.json(orderItem);
});

exports.updateOrderItem = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;
  const orderItem = await OrderItem.findById(req.params.id);

  if (!orderItem) return next(new AppError('Order item not found', 404));

  if (quantity !== undefined) {
    orderItem.quantity = quantity;
    const productDoc = await Product.findById(orderItem.product);
    if (productDoc) {
      orderItem.price = productDoc.price * quantity;
    }
  }

  const updatedOrderItem = await orderItem.save();
  res.json(updatedOrderItem);
});

exports.deleteOrderItem = catchAsync(async (req, res, next) => {
  const orderItem = await OrderItem.findById(req.params.id);

  if (!orderItem) return next(new AppError('Order item not found', 404));

  await orderItem.deleteOne();
  res.json({ message: 'Order item removed' });
});
