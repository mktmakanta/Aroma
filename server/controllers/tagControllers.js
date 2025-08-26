const Tag = require('../models/Tag');
const Product = require('../models/Product');

// @desc Get all tags
exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new tag (optional if you want to allow dynamic tags)
exports.createTag = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Tag.findOne({ name });
    if (exists) return res.status(400).json({ message: 'Tag already exists' });

    const tag = new Tag({ name });
    const createdTag = await tag.save();

    res.status(201).json(createdTag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get products by tag
exports.getProductsByTag = async (req, res) => {
  try {
    const products = await Product.find({ tags: req.params.tag })
      .populate('category', 'name')
      .select('name price description tags');

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
