const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: [
        'Men',
        'Women',
        'Luxury',
        'Designer',
        'Summer Collection',
        'Winter Collection',
        'Gift Set',
      ],

      trim: true,
    },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = Category;
