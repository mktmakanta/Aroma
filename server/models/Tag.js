const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: [
        'Woody',
        'Floral',
        'Citrus',
        'Oriental',
        'Fresh',
        'Spicy',
        'Limited Edition',
        'New Arrival',
        'Best Seller',
        'On Sale',
      ],
      trim: true,
    },
  },
  { timestamps: true }
);

const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema);

module.exports = Tag;
