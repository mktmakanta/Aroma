const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Men's Perfume", "Women's Perfume", 'Unisex', 'Luxury', 'Budget'],

      trim: true,
    },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = Category;
