const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const shopSchema =  new mongoose.Schema({
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
  created: {
    type: Date,
    default: Date.now
  },
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
  }
});

shopSchema.pre('save', async function(next) {
  if(!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model('Shop', shopSchema);
