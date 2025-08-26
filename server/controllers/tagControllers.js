const Tag = require('../models/Tag');

// CREATE TAG
exports.createTag = async (req, res) => {
  try {
    const existingTag = await Tag.findOne({ name: req.body.name });
    if (existingTag) {
      return res.status(400).json({
        status: 'fail',
        message: 'Tag already exists',
      });
    }

    const tag = await Tag.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Tag created successfully',
      data: { tag },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to create tag',
      err,
    });
  }
};

// GET ALL TAGS
exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json({
      status: 'success',
      results: tags.length,
      data: { tags },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to fetch tags',
      err,
    });
  }
};

// GET TAG BY ID
exports.getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tag not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: { tag },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to fetch tag',
      err,
    });
  }
};

// DELETE TAG
exports.deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tag not found',
      });
    }
    res.status(204).json({
      status: 'success',
      message: 'Tag deleted successfully',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to delete tag',
      err,
    });
  }
};
