const mongoose = require('mongoose');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { orderItems, user, status } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
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
      results: order.length,
      data: {
        order,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate({
        path: 'orderItems',
        populate: { path: 'product', select: 'name price' },
      });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate({
        path: 'orderItems',
        populate: { path: 'product', select: 'name price' },
      });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status || order.status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Remove order items linked to this order
    await OrderItem.deleteMany({ _id: { $in: order.orderItems } });

    await order.deleteOne();
    res.json({ message: 'Order and related items removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
