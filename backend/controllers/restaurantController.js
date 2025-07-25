const Restaurant = require('../models/Restaurant');
const Food = require('../models/Food');

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('foods');
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('foods');
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getRestaurants, getRestaurant };

