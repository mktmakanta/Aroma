const Product = require('../models/Product');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// GET TOP 5 PRODUCT USING ALIASING
exports.topProducts = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'rating,price';
  req.query.fields = 'name,description,brand,createdAt,user ';

  next();
};

// GET ALL products
exports.getProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query
    .populate('user', 'name email')
    .populate('reviews', 'comment rating')
    .populate('categories', 'name')
    .populate('tags', 'name');
  res.status(200).json({
    status: 200,
    results: products.length,
    data: {
      products,
    },
  });
});

// GET A PRODUCT BY ID
exports.getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate('user', 'name email')
    .populate('categories', 'name')
    .populate('reviews', 'comment rating')
    .populate('tags', 'name');
  if (!product) {
    return next(new AppError('Could not find a product with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { product },
  });
});

// CREATE PRODUCT
exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    message: 'product created successfully',
    data: {
      product: newProduct,
    },
  });
});

// UPDATE PRODUCT
exports.updateProduct = catchAsync(async (req, res, next) => {
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
    .populate('categories', 'name')
    .populate('tags', 'name');
  if (!updatedProduct) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Product not found' });
  }
  res.status(200).json({
    status: 'success',
    data: { product: updatedProduct },
  });
});

// DELETE PRODUCT
exports.deleteProduct = catchAsync(async (req, res, next) => {
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
});

exports.deleteAllProducts = catchAsync(async (req, res, next) => {
  await Product.deleteMany({});
  res.status(200).json({ message: 'All products deleted successfully' });
});

exports.productStats = catchAsync(async (req, res, next) => {
  const stats = await Product.aggregate([
    {
      $match: { price: { $gte: 0 } },
    },
    {
      $group: {
        _id: { $toUpper: '$brand' },
        numProducts: { $sum: 1 },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
        countInStock: { $sum: '$countInStock' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.categoryStats = catchAsync(async (req, res, next) => {
  const stats = await Product.aggregate([
    {
      $facet: {
        perCategory: [
          { $unwind: '$categories' },
          {
            $group: {
              _id: '$categories',
              numProducts: { $sum: 1 },
              avgPrice: { $avg: '$price' },
              minPrice: { $min: '$price' },
              maxPrice: { $max: '$price' },
              countInStock: { $sum: '$countInStock' },
            },
          },
          { $sort: { numProducts: -1 } },
        ],
        overall: [
          {
            $group: {
              _id: null,
              totalStock: { $sum: '$countInStock' },
              avgPriceAll: { $avg: '$price' },
              totalAmount: {
                $sum: { $multiply: ['$price', '$countInStock'] },
              },
            },
          },
        ],
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: stats[0], // facet returns an array with { perCategory, overall }
  });
});
