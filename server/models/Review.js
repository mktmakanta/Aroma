const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      require: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 400,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

module.exports = Review;
