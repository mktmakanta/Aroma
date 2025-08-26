const express = require('express');
const router = express.Router();
const {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  deleteOrderItem,
  updateOrderItem,
} = require('../controllers/orderItemControllers');

router.route('/').get(getOrderItems).post(createOrderItem);

router
  .route('/:id')
  .get(getOrderItemById)
  .delete(deleteOrderItem)
  .patch(updateOrderItem);

module.exports = router;
