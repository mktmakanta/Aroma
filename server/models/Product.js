const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 50,
      // validate: [validator.isAlpha, 'Product name must only contain characters'],
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
      maxlength: 2000,
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
    priceDiscount: {
      type: Number,
      min: 0,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
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
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

// ----------INDEXES-----------
productSchema.index({ slug: 1 }); // unique or single index
productSchema.index({ price: 1, countInStock: -1 }); // compound

// ----------MONGOOSE DOCUMENT MIDDLEWARE------------
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

productSchema.pre(/^find/, function (next) {
  this.populate('user', 'name email')
    .populate('reviews', 'comment rating')
    .populate('categories', 'name')
    .populate('tags', 'name');
  next();
});

// productSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// ---------MONGOOSE QUERY MIDDLEWARE----------
// productSchema.pre('find', function (next) {
//   this.find({ published: true });
//   next();
// });

// ------------AGGREGATION MIDDLEWARE--------------
// productSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { published: true } });

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
