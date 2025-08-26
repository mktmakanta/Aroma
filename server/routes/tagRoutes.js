const express = require('express');
const {
  getTags,
  createTag,
  getProductsByTag,
} = require('../controllers/tagController');
// const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getTags).post(createTag); //  protect, admin,

router.route('/:tag/products').get(getProductsByTag);

module.exports = router;
