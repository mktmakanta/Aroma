const Review = require('../models/Review');
const Product = require('../models/Product');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// const User = require('../models/User'); // Uncomment if user details are needed

exports.createReview = catchAsync(async (req, res, next) => {
  const { productId, comment, rating } = req.body;
  req.user = req.user || { _id: '68aa5594c89316ae4619fdcc' };

  const product = await Product.findById(productId);
  if (!product)
    return next(new AppError('Could not find a product with that ID', 404));

  const review = new Review({
    product: productId,
    user: req.user._id,
    comment,
    rating,
  });

  const createdReview = await review.save();
  await Product.findByIdAndUpdate(productId, {
    $push: { reviews: review._id },
  });

  res.status(201).json({
    message: 'Review created',
    review: createdReview,
  });
});

exports.getReviewsByProduct = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ product: req.params.id })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

  res.json(reviews);
});

exports.updateReview = catchAsync(async (req, res, next) => {
  req.user = req.user || { _id: '68aa5594c89316ae4619fdcc' };

  const review = await Review.findById(req.params.id);
  if (!review) return next(new AppError('Review not found', 404));

  if (review.user.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorize', 403));
  }

  review.comment = req.body.comment ?? review.comment;
  review.rating = req.body.rating ?? review.rating;

  const updatedReview = await review.save();
  res.json(updatedReview);
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  req.user = req.user || { _id: '68aa5594c89316ae4619fdcc' };

  const review = await Review.findById(req.params.id);
  if (!review) return next(new AppError('Review not found', 404));

  if (review.user.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized', 403));
  }

  await review.deleteOne();
  res.json({ message: 'Review deleted' });
});
