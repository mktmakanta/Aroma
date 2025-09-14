const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate('user', 'name avatar')
      //// .populate('product', 'name');
  next();
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

module.exports = Review;
