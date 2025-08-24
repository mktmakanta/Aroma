const Product = require('../models/Product');

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
    console.log(req.query);

    // 1) FILTERING
    // -----BUILD QUERY-----
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // --------ADVANCED---------
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // 2) SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) FIELD LIMITING
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) PAGINATION
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numproducts = await Product.countDocuments();
      if (skip >= numproducts) throw new Error('This page does not exist');
    }
    const products = await query.populate('user', 'name email');
    // .populate('reviews', 'comment rating')
    // .populate('categories', 'name')
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
    const product = await Product.findById(req.params.id).populate(
      'user',
      'name email'
    );
    // .populate('reviews', 'comment rating')
    // .populate('categories', 'name')
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
    ).populate('user', 'name email');
    // .populate('reviews', 'comment rating')
    // .populate('categories', 'name')
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
