const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require('./../controllers/orderControllers');
const authcontroller = require('./../controllers/authControllers');

router.use(authcontroller.protect);

router.post('/', createOrder);
router.get('/:id', getOrderById);

router.use(authcontroller.restrictTO('admin'));

router.get('/', getOrders);
router.patch('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;
