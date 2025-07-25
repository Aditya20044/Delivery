const express = require('express');
const auth = require('../middleware/auth');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');

const router = express.Router();

router.get('/', auth, getCart);
router.post('/add', auth, addToCart);
router.post('/remove', auth, removeFromCart);

module.exports = router;

