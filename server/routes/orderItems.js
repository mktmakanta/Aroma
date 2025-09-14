const express = require('express');
const router = express.Router();
const {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  deleteOrderItem,
  updateOrderItem,
} = require('../controllers/orderItemControllers');
const authcontroller = require('../controllers/authControllers');

router.use(authcontroller.protect);

router.post('/', createOrderItem);
router.get('/:id', getOrderItemById);

router.use(authcontroller.restrictTO('admin')); // admin only

router.get('/', getOrderItems);
router.route('/:id').patch(updateOrderItem).delete(deleteOrderItem);

module.exports = router;
