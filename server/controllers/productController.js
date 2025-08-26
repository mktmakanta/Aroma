const Product = require('../models/Product');
const APIFeatures = require('./../utils/apiFeatures');

// GET TOP 5 PRODUCT USING ALIASING
exports.topProducts = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'rating,price';
  req.query.fields = 'name,description,brand,createdAt,user ';

  next();
};

// GET ALL products
exports.getProducts = async (req, res) => {
  try {
    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const products = await features.query
      .populate('user', 'name email')
      .populate('reviews', 'comment rating')
      .populate('categories', 'name');
    // .populate('tags', 'name');
    res.status(200).json({
      status: 200,
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to fetch products',
      err,
    });
  }
};

// GET A PRODUCT BY ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('user', 'name email')
      .populate('reviews', 'comment rating')
      .populate('categories', 'name');
    // .populate('tags', 'name');
    if (!product) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Product not found' });
    }
    res.status(200).json({
      status: 'success',
      data: { product },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to fetch product',
      err,
    });
  }
};

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'product created successfully',
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to create product',
      err,
    });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('user', 'name email')
      .populate('reviews', 'comment rating')
      .populate('categories', 'name');
    // .populate('tags', 'name');
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Product not found' });
    }
    res.status(200).json({
      status: 'success',
      data: { product: updatedProduct },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to update product',
      err,
    });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Product not found' });
    }
    res.status(204).json({
      status: 'success',
      message: 'Product deleted',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to delete product',
      err,
    });
  }
};
