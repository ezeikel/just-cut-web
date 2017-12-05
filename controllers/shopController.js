const mongoose = require('mongoose');
const Shop = mongoose.model('Shop');
//const User = mongoose.model('User');
//const multer = require('multer');
//const jimp = require('jimp');
const uuid = require('uuid');

exports.createShop =  async (req, res) => {
  //req.body.author = req.user._id;
  
  const shop = await (new Shop(req.body).save());

  //TODO: Return the new slug to the FE and redirect
  //res.json({"slug": `/shop/${shop.slug}`});
  res.send('Success');
}
