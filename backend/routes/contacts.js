const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { submitContact, getContacts } = require('../controllers/contactController');

const router = express.Router();

router.post('/', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('message').notEmpty(),
], submitContact);

router.get('/', auth, role('admin'), getContacts);

module.exports = router;

