const Category = require('../models/Category');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// GET all categories
exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: { categories },
  });
});

// GET category by ID
exports.getCategoryById = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError('Category not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { category },
  });
});

// CREATE category
exports.createCategory = catchAsync(async (req, res, next) => {
  const existingCategory = await Category.findOne({ name: req.body.name });
  if (existingCategory) {
    return next(new AppError('Category already exists', 400));
  }

  const newCategory = await Category.create(req.body);
  res.status(201).json({
    status: 'success',
    message: 'Category created successfully',
    data: { category: newCategory },
  });
});

// UPDATE category
exports.updateCategory = catchAsync(async (req, res, next) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedCategory) {
    return next(new AppError('Category not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { category: updatedCategory },
  });
});

// DELETE category
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const deletedCategory = await Category.findByIdAndDelete(req.params.id);
  if (!deletedCategory) {
    return next(new AppError('Category not found', 404));
  }
  res.status(204).json({
    status: 'success',
    message: 'Category deleted',
    data: null,
  });
});
