const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      min: 1,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

orderItemSchema.pre(/^find/, function (next) {
  this.populate('product', 'name, description');
  next();
});

const OrderItem =
  mongoose.models.OrderItem || mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;
