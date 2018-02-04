const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const shopController = require('../controllers/shopController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/users', catchErrors(userController.testApi));
router.get('/shops', catchErrors(shopController.getShops));
router.get('/shop/:slug', catchErrors(shopController.getShopBySlug));
router.post('/find-shops', catchErrors(shopController.findShops));

router.post('/add',
  shopController.upload,
  catchErrors(shopController.resize),
  catchErrors(shopController.createShop)
);

module.exports = router;
