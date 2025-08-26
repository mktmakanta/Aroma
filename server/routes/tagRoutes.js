const express = require('express');
const tagController = require('../controllers/tagControllers');

const router = express.Router();

router.route('/').post(tagController.createTag).get(tagController.getTags);

router
  .route('/:id')
  .get(tagController.getTagById)
  // .patch(tagController.updateTag) // update route is not needed because of enum in
  .delete(tagController.deleteTag);

module.exports = router;
