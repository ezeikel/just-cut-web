const mongoose = require('mongoose');

const Shop = mongoose.model('Shop');

exports.createShop = async (req, res) => {
  const shop = await (new Shop(req.body).save());
  res.send(`Success. Created the ${shop.name} shop.`);
};

exports.getShops = async (req, res) => {
  const shopsPromise = Shop.find();
  const stores = await shopsPromise;
  res.json(stores);
};
