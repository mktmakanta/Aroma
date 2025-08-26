const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

exports.createOrderItem = async (req, res) => {
  try {
    const query = req.body;

    const productDoc = await Product.findById(query.product);
    if (!productDoc)
      return res.status(404).json({ message: 'Product not found' });

    const orderItem = new OrderItem({
      product: query.product,
      quantity: query.quantity,
      price: productDoc.price * query.quantity,
    });
    const createdOrderItem = await OrderItem.create(orderItem);
    res.status(201).json(createdOrderItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find().populate('product', 'name price');
    res.json({
      status: 'success',
      message: 'product created successfully',
      count: orderItems.length,
      data: {
        product: orderItems,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderItemById = async (req, res) => {
  try {
    const orderItem = await OrderItem.findById(req.params.id).populate(
      'product',
      'name price'
    );

    if (!orderItem)
      return res.status(404).json({ message: 'Order item not found' });

    res.json(orderItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const orderItem = await OrderItem.findById(req.params.id);

    if (!orderItem)
      return res.status(404).json({ message: 'Order item not found' });

    if (quantity !== undefined) {
      orderItem.quantity = quantity;
      const productDoc = await Product.findById(orderItem.product);
      if (productDoc) {
        orderItem.price = productDoc.price * quantity;
      }
    }

    const updatedOrderItem = await orderItem.save();
    res.json(updatedOrderItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findById(req.params.id);

    if (!orderItem)
      return res.status(404).json({ message: 'Order item not found' });

    await orderItem.deleteOne();
    res.json({ message: 'Order item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
