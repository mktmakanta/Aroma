const express = require('express');

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
  // deleteAllProducts,
} = require('../controllers/productController');

router.route('/').get(getProducts).post(createProduct);

router
  .route('/:id')
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

router.route('/top-5-products').get(topProducts, getProducts);
router.route('/products-stats').get(productStats);
router.route('/categories-stats').get(categoryStats);
// router.route('/delete-all').delete(deleteAllProducts);

module.exports = router;
