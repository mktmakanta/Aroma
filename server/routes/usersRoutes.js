const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authControllers');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/top-users')
  .get(userController.topUsers, userController.getUsers);

router
  .route('/')
  .get(authController.protect, userController.getUsers) //protected route
  .post(userController.createUser);

// router.param('id', userController.validateUserId);
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
