const mongoose = require('mongoose'); // eslint-disable-line
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address'
  },
  fullName: {
    type: String,
    required: 'Please supply a name',
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: 'Please supply a username',
    trim: true,
    lowercase: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  hearts: [
    { type: mongoose.Schema.ObjectId, ref: 'Shop' }
  ]
});

userSchema.virtual('gravatar').get(function() {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema.virtual('firstName').get(function() {
  return this.fullName.split(' ')[0];
});

userSchema.virtual('lastName').get(function() {
  const names = this.fullName.split(' ');
  return names[names.length - 1];
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
