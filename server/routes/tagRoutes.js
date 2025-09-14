const express = require('express');
const tagController = require('../controllers/tagControllers');
const authController = require('../controllers/authControllers');

const router = express.Router();

router.use(authController.restrictTO('admin'));

router.route('/').post(tagController.createTag).get(tagController.getTags);
router
  .route('/:id')
  .get(tagController.getTagById)
  // .patch(tagController.updateTag) // update route is not needed because of enum in
  .delete(tagController.deleteTag);

module.exports = router;
