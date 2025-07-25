const express = require('express');
const { getRestaurants, getRestaurant } = require('../controllers/restaurantController');

const router = express.Router();

router.get('/', getRestaurants);
router.get('/:id', getRestaurant);

module.exports = router;

