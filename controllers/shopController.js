const mongoose = require('mongoose');
const Shop = mongoose.model('Shop');
//const User = mongoose.model('User');
//const multer = require('multer');
//const jimp = require('jimp');
const uuid = require('uuid');

exports.createShop =  async (req, res) => {
  //req.body.author = req.user._id;
  const shop = await (new Shop(req.body).save());
  res.json({"slug": `/shop/${shop.slug}`});
}
