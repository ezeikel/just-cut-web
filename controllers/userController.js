const mongoose = require('mongoose');
const fetch = require('node-fetch');
//const User = mongoose.model('User');

exports.testApi = async (req, res) => {
  const users = await fetch('https://jsonplaceholder.typicode.com/users');
  res.json(await users.json());
}
