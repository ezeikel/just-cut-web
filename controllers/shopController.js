const mongoose = require('mongoose');

const Shop = mongoose.model('Shop');

exports.createShop = async (req, res) => {
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
