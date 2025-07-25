const express = require('express');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router();

router.post('/place', auth, placeOrder);
router.get('/my', auth, getUserOrders);
router.get('/all', auth, role('admin'), getAllOrders);
router.patch('/:id/status', auth, role('admin'), updateOrderStatus);

module.exports = router;

