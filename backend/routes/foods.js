const express = require('express');
const { getFoods, searchFoods } = require('../controllers/foodController');

const router = express.Router();

router.get('/', getFoods);
router.get('/search', searchFoods);

module.exports = router;

