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

router.use(authcontroller.protect); // Protected

router.delete('/:id', deleteReview);
router.get('/product/:id', getReviewsByProduct);

router.post('/:productId', authcontroller.restrictTO('user'), createReview); //only the users can add review
router.patch('/:id', authcontroller.restrictTO('user'), updateReview);

router.use(authcontroller.restrictTO('admin'))
router.get('/', getAllReviews); // Admin can view all reviews on all products

module.exports = router;
