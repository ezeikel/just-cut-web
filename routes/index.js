const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const { catchErrors } = require('../handlers/errorHandlers');
const fetch = require('node-fetch');

// do work here
router.get('/', (req, res, next) => {
  res.send('Hey! It works');
});

router.post('/add',
  catchErrors(shopController.createShop)
);

router.get('/users', async (req, res, next) => {
  const users = await fetch('https://jsonplaceholder.typicode.com/users');
  //res.json(await users.json());
  res.send('Hello from the users.');
  //TODO: Need to add an error handler to wrap async calls
});

router.get('/add', async (req, res, next) => {
  res.send('Just so i dont have to look at an ugly pug..');
});

module.exports = router;
