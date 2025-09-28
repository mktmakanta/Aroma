const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');
const { restrictTO } = require('../controllers/authControllers');

router.use(restrictTO('admin'));

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
