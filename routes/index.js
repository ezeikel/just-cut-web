const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const shopController = require('../controllers/shopController');
const { catchErrors } = require('../handlers/errorHandlers');

// do work here
router.get('/', (req, res, next) => res.send('The Server is running. Run the React App.'));
router.get('/users', catchErrors(userController.testApi));
router.get('/shops', catchErrors(shopController.getShops));

router.post('/add', catchErrors(shopController.createShop));

module.exports = router;
