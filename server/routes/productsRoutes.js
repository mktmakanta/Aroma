const express = require('express');
const authController = require('../controllers/authControllers');

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  topProducts,
  productStats,
  categoryStats,
  deleteAllProducts,
} = require('../controllers/productController');

const { protect } = require('../controllers/authControllers');

router.route('/').get(protect, getProducts).post(createProduct);

router.route('/top-5-products').get(topProducts, getProducts);
router.route('/products-stats').get(productStats);
router.route('/categories-stats').get(categoryStats);
router.route('/delete-all').delete(deleteAllProducts);

router
  .route('/:id')
  .get(getProductById)
  .patch(updateProduct)
  .delete(
    authController.protect,
    authController.restrictTO('admin'),
    deleteProduct
  );

module.exports = router;
