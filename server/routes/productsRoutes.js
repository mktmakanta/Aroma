const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  topProducts,
  productStats,
  categoryStats,
  deleteAllProducts,
  uploadProductImages,
  resizeProductImages,
} = require('../controllers/productController');
const { protect, restrictTO } = require('../controllers/authControllers');

router.get('/', getProducts);
router.route('/top-5-products').get(topProducts, getProducts);

router.use(protect); // logged in user

router.route('/:slug').get(getProductBySlug);

router.use(restrictTO('admin')); // admin only

router.post('/', createProduct);
router.route('/products-stats').get(productStats);
router.route('/categories-stats').get(categoryStats);
router.route('/delete-all').delete(deleteAllProducts);

router.patch('/:id', uploadProductImages, resizeProductImages, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
