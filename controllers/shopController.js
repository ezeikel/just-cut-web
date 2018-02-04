const mongoose = require('mongoose');
const Shop = mongoose.model('Shop');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false);
    }
  }
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {

  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return;
  }

  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once we have written the photo to our filesystem, keep going!
  next();
}

exports.createShop = async (req, res) => {
  // turn location json back into an object
  req.body.location = JSON.parse(req.body.location);
  const shop = await (new Shop(req.body).save());
  res.send(`Success. Created the ${shop.name} shop.`);
};

exports.getShops = async (req, res) => {
  const shopsPromise = Shop.find();
  const shops = await shopsPromise;
  res.json(shops);
};

exports.findShops = async (req, res) => {
  const shopsPromise = Shop.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: req.body.coordinates },
        $minDistance: req.body.minDistance,
        $maxDistance: req.body.maxDistance
      }
    }
  });
  const shops = await shopsPromise;
  res.json(shops);
};
