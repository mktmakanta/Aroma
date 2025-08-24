const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true,
      },
    ],
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
      },
    ],
    quantity: {
      type: Number,
      min: 1,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderItem =
  mongoose.models.OrderItem || mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;
