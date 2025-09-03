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
      .populate('categories', 'name')
      .populate('tags', 'name');
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
      .populate('categories', 'name')
      .populate('reviews', 'comment rating')
      .populate('tags', 'name');
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

// exports.deleteAllProducts = async (req, res) => {
//   try {
//     await Product.deleteMany({});
//     res.status(200).json({ message: 'All products deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.productStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        // $match: { price: { $gte: 0 } },
        $match: { price: { $gte: 0 } },
      },

      {
        $group: {
          _id: { $toUpper: '$brand' }, // set to null to get overall stats
          numProducts: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          countInStock: { $sum: '$countInStock' },
          // totalCountInStock: { $sum: '$countInStock' },
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to get product stats',
      err,
    });
  }
};

exports.categoryStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $facet: {
          // Per category stats
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

          // Overall stats
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to get category stats',
      err,
    });
  }
};
