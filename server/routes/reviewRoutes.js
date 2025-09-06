const express = require('express');
const {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview,
} = require('../controllers/reviewControllers');
// const { protect } = require('../middleware/authMiddleware'); // uncomment later for auth

const router = express.Router();
router.post('/', createReview); // later: [protect, createReview]

router.get('/product/:id', getReviewsByProduct);
router.patch('/:id', updateReview); // later: [protect, updateReview]
router.delete('/:id', deleteReview); // later: [protect, deleteReview]

module.exports = router;
