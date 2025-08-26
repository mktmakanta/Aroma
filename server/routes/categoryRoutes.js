const express = require('express');
const categoryController = require('../controllers/categoryControllers');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getCategories)
  .post(categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategoryById)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
