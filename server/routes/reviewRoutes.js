const express = require('express');
const {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview,
} = require('./../controllers/reviewControllers');
// const { protect } = require('../middleware/authMiddleware'); // auth middleware

const router = express.Router();

router.route('/').post(createReview); // add prtected route when auth is ready
router.route('/:id').delete(deleteReview).patch(updateReview); //protect, //protect,
router.route('/product/:id').get(getReviewsByProduct);

module.exports = router;
