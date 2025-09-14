const express = require('express');
const {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview,
  getAllReviews,
} = require('../controllers/reviewControllers');
const authcontroller = require('./../controllers/authControllers');

const router = express.Router();

router.get('/', getAllReviews);

router.get('/product/:id', getReviewsByProduct);
router.post(
  '/:productId',
  authcontroller.protect,
  authcontroller.restrictTO('user'),
  createReview
); //only the users can add review
router.patch(
  '/:id',
  authcontroller.protect,
  authcontroller.restrictTO('user'),
  updateReview
);
router.delete('/:id', authcontroller.protect, deleteReview);

module.exports = router;
