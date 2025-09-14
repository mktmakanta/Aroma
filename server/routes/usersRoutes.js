const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authControllers');
const { route } = require('./productsRoutes');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

router.use(authController.protect);

router.get('/me', userController.getMe);
router.patch('/update-my-password', authController.updatePassword);
router.patch('/update-me', userController.updateMe);
router.delete('/delete-me', userController.deleteMe);

router.use(authController.restrictTO('admin')); // only admin

router.route('/').get(userController.getUsers).post(userController.createUser);
router
  .route('/top-users')
  .get(userController.topUsers, userController.getUsers);

router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
