const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

const submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, email, message } = req.body;
  try {
    const contact = await Contact.create({ name, email, message });
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitContact, getContacts };

