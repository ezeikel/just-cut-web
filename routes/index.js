const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const shopController = require('../controllers/shopController');
const { catchErrors } = require('../handlers/errorHandlers');

// do work here
router.get('/', (req, res, next) => res.send('Hey! It works'));
router.post('/add', catchErrors(shopController.createShop));
router.get('/users', catchErrors(userController.testApi));
router.get('/shops', catchErrors(shopController.getShops));

module.exports = router;
