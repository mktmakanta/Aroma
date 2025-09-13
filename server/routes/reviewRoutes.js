const express = require('express');
const {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview,
} = require('../controllers/reviewControllers');
const authcontroller = require('./../controllers/authControllers');

const router = express.Router();
router.post('/', authcontroller.protect, createReview);

router.get('/product/:id', getReviewsByProduct);
router.patch('/:id', authcontroller.protect, updateReview);
router.delete('/:id', authcontroller.protect, deleteReview);

module.exports = router;
