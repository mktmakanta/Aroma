const express = require('express');

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  topProducts,
  // deleteAllProducts,
} = require('../controllers/productController');

router.route('/top-5-products').get(topProducts, getProducts);
router.route('/').get(getProducts).post(createProduct);
// router.route('/delete-all').delete(deleteAllProducts);
router
  .route('/:id')
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
