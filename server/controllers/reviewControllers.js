const Review = require('../models/Review');
const Product = require('../models/Product');
// const User = require('../models/User'); // Uncomment if user details are needed

exports.createReview = async (req, res) => {
  try {
    const { productId, comment, rating } = req.body;
    req.user = req.user || { _id: '68aa5594c89316ae4619fdcc' };

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    req.user = req.user || { _id: '68aa5594c89316ae4619fdcc' };

    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    review.comment = req.body.comment ?? review.comment;
    review.rating = req.body.rating ?? review.rating;

    const updatedReview = await review.updateOne(review, { new: true });
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    req.user = req.user || { _id: '68aa5594c89316ae4619fdcc' };

    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
