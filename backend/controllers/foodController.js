const Food = require('../models/Food');
const Restaurant = require('../models/Restaurant');

const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate('restaurant');
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const searchFoods = async (req, res) => {
  const { q, restaurant } = req.query;
  let filter = {};
  if (q) filter.name = { $regex: q, $options: 'i' };
  if (restaurant) filter.restaurant = restaurant;
  try {
    const foods = await Food.find(filter).populate('restaurant');
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getFoods, searchFoods };

