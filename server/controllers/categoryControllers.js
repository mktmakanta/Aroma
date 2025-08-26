const Category = require('../models/Category');

// GET all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: 'success',
      results: categories.length,
      data: { categories },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to fetch categories',
      err,
    });
  }
};

// GET category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        status: 'fail',
        message: 'Category not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: { category },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to fetch category',
      err,
    });
  }
};

// CREATE category
exports.createCategory = async (req, res) => {
  try {
    const existingCategory = await Category.findOne({ name: req.body.name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = await Category.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Category created successfully',
      data: { category: newCategory },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to create category',
      err,
    });
  }
};

// UPDATE category
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({
        status: 'fail',
        message: 'Category not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: { category: updatedCategory },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to update category',
      err,
    });
  }
};

// DELETE category
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({
        status: 'fail',
        message: 'Category not found',
      });
    }
    res.status(204).json({
      status: 'success',
      message: 'Category deleted',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to delete category',
      err,
    });
  }
};
