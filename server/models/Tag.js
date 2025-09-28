const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      enum: [
        'Floral',
        'Woody',
        'Fresh',
        'Oriental',
        'Citrus',
        'Spicy',
        'Classic',
        'Modern',
      ],
      trim: true,
    },
  },
  { timestamps: true }
);

const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema);

module.exports = Tag;
