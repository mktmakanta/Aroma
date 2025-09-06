const Tag = require('../models/Tag');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// CREATE TAG
exports.createTag = catchAsync(async (req, res, next) => {
  const existingTag = await Tag.findOne({ name: req.body.name });
  if (existingTag) {
    return next(new AppError('Tag already exist', 400));
  }

  const tag = await Tag.create(req.body);
  res.status(201).json({
    status: 'success',
    message: 'Tag created successfully',
    data: { tag },
  });
});

// GET ALL TAGS
exports.getTags = catchAsync(async (req, res, next) => {
  const tags = await Tag.find();
  res.status(200).json({
    status: 'success',
    results: tags.length,
    data: { tags },
  });
});

// GET TAG BY ID
exports.getTagById = catchAsync(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id);
  if (!tag) {
    return next(new AppError("Tag with that ID doesn't exist", 404));
  }
  res.status(200).json({
    status: 'success',
    data: { tag },
  });
});

// DELETE TAG
exports.deleteTag = catchAsync(async (req, res, next) => {
  const tag = await Tag.findByIdAndDelete(req.params.id);
  if (!tag) {
    return next(new AppError("Tag with that ID doesn't exist", 404));
  }
  res.status(204).json({
    status: 'success',
    message: 'Tag deleted successfully',
    data: null,
  });
});
