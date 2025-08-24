const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    // name, slug, description, brand (can be enum), image, price, countInStock, published
    //---references---author, orderItems, tags, category, rating, reviews
    // updatedAt, createdAt

    name: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 50,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: 1000,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },
    image: {
      type: String,
      trim: true,
      default: 'https://ui-avatars.com/api/?name=User&background=random',
    },
    price: {
      type: Number,
      require: [true, 'Price of product is required'],
      min: 0,
    },
    countInStock: {
      type: Number,
      required: [true, 'Price of product is required'],
      min: 0,
      default: 0,
    },
    published: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    orderItem: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: 'Tag',
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  { timestamps: true }
);

// Auto-generate unique slug from title
productSchema.pre('save', async function (next) {
  if (this.isModified('name')) {
    let baseSlug = slugify(this.name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Check if slug already exists
    while (await mongoose.models.Product.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    this.slug = slug;
  }
  next();
});

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
