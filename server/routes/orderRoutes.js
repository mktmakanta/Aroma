const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require('./../controllers/orderControllers');

router.route('/').get(getOrders).post(createOrder);

router
  .route('/:id')
  .get(getOrderById)
  .patch(updateOrderStatus)
  .delete(deleteOrder);

module.exports = router;
