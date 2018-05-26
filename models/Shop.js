const mongoose = require('mongoose'); // eslint-disable-line
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const slug = require('slugs');

const shopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Please enter a shop name!'
    },
    slug: String,
    description: {
      type: String,
      trim: true
    },
    tags: [String],
    priceLevel: String,
    created: {
      type: Date,
      default: Date.now
    },
    ratings: [Number],
    location: {
      type: {
        type: String,
        default: 'Point'
      },
      coordinates: [{
        type: Number,
        required: 'You must supply coordinates!'
      }],
      address: {
        type: String,
        required: 'You must supply an address!',
        trim: true
      }
    },
    photo: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// define our indexs
shopSchema.index({
  name: 'text',
  description: 'text'
});

shopSchema.index({ location: '2dsphere' });

shopSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  // find other shops that have a slug of wes, wes-1, wes-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const shopsWithSlug = await this.constructor.find({
    slug: slugRegEx
  });
  if (shopsWithSlug.length) {
    this.slug = `${this.slug}-${shopsWithSlug.length + 1}`;
  }
  next();
  // TODO: make more resiliant so slugs are unique
});

shopSchema.statics.getTagsList = function() {
  return this.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

shopSchema.statics.getTopShops = function() {
  return this.aggregate([
    // lookup Shops and populate their reviews
    {
      $lookup: {
        from: 'reviews', localField: '_id', foreignField: 'shop', as: 'reviews'
      }
    },
    // filter for only items that have 2 or more reviews
    { $match: { 'reviews.1': { $exists: true } } },
    // add average reviews field
    {
      $project: {
        photo: '$$ROOT.photo',
        name: '$$ROOT.name',
        reviews: '$$ROOT.reviews',
        slug: '$$ROOT.slug',
        averageRating: { $avg: '$reviews.rating' }
      }
    },
    // sort it by our new field, highest reviews first
    { $sort: { averageRating: -1 } },
    // limit to at most 10
    { $limit: 10 }
  ]);
};

// find reviews where the shops _id property === reviews shop property
shopSchema.virtual('reviews', {
  ref: 'Review', // what model to link
  localField: '_id', // which field on the shop?
  foreignField: 'shop' // which field on the review?
});

function autopopulate(next) {
  this.populate('reviews');
  next();
}

shopSchema.pre('find', autopopulate);
shopSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Shop', shopSchema);
