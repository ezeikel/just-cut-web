const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// do work here
router.get('/', (req, res, next) => {
  res.send('Hey! It works');
});

router.get('/users', async (req, res, next) => {
  const users = await fetch('https://jsonplaceholder.typicode.com/users');
  res.json(await users.json());
  //TODO: Need to add an error handler to wrap async calls
});

module.exports = router;
