const mongoose = require('mongoose');
const slug = require('slugs');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

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
  next();
});

module.exports = mongoose.model('Shop', shopSchema);
