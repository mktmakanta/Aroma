const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Create Review
// @route   POST /api/reviews
exports.createReview = async (req, res) => {
  try {
    const { productId, comment, rating } = req.body;
    // fake user until auth is ready
    req.user = req.user || { _id: '68aa54d2c89316ae4619fdc6' };

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const review = new Review({
      product: productId,
      user: req.user._id,
      comment,
      rating,
    });

    const createdReview = await review.save();
    res.status(201).json({
      message: 'Review created',
      review: createdReview,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Reviews by Product
// @route   GET /api/reviews/product/:id
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

// @desc    Update Review
// @route   PUT /api/reviews/:id
exports.updateReview = async (req, res) => {
  try {
    req.user = req.user || { _id: '68aa54d2c89316ae4619fdc6' };

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

// @desc    Delete Review
// @route   DELETE /api/reviews/:id
exports.deleteReview = async (req, res) => {
  try {
    req.user = req.user || { _id: '68aa54d2c89316ae4619fdc6' };

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
