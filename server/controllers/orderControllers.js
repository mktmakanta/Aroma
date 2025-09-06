const mongoose = require('mongoose');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// CREATE ORDER
exports.createOrder = catchAsync(async (req, res, next) => {
  const { orderItems, user, status } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return next(new AppError('No order items', 400));
  }

  const totalPriceAgg = await OrderItem.aggregate([
    {
      $match: {
        _id: { $in: orderItems.map((id) => new mongoose.Types.ObjectId(id)) },
      },
    },
    { $group: { _id: null, total: { $sum: '$price' } } },
  ]);
  const totalPrice = totalPriceAgg[0]?.total || 0;

  const order = await Order.create({
    user,
    orderItems,
    totalPrice,
    status: status,
  });

  res.status(201).json({
    status: 200,
    data: { order },
  });
});

// GET ALL ORDERS
exports.getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find()
    .populate('user', 'name email')
    .populate({
      path: 'orderItems',
      populate: { path: 'product', select: 'name price' },
    });

  res.json(orders);
});

// GET ORDER BY ID
exports.getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate({
      path: 'orderItems',
      populate: { path: 'product', select: 'name price' },
    });

  if (!order) return next(new AppError('Order not found!', 404));

  res.json(order);
});

// UPDATE ORDER STATUS
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) return next(new AppError('Order not found!', 404));

  order.status = status || order.status;
  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

// DELETE ORDER
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new AppError('Order not found!', 404));

  // Remove order items linked to this order
  await OrderItem.deleteMany({ _id: { $in: order.orderItems } });

  await order.deleteOne();
  res.json({ message: 'Order and related items removed' });
});
