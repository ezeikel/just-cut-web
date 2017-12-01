const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// do work here
router.get('/', (req, res, next) => {
  res.send('Hey! It works');
});

router.get('/users', async (req, res, next) => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(data => data.json())
    .then(users => res.json(users))
    .catch(error => console.log(error));
});

module.exports = router;
