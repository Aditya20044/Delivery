const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Food = require('../models/Food');
const Restaurant = require('../models/Restaurant');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const foods = [
  { name: 'Margherita Pizza', description: 'Classic cheese pizza', price: 109.99, image: 'https://delivery-l4p6.onrender.com/images/Margherita_Pizza.jpg', type: 'veg' },
  { name: 'Pepperoni Pizza', description: 'Pepperoni and cheese', price: 119.99, image: 'https://delivery-l4p6.onrender.com/images/pepperoni_pizza.webp', type: 'nonveg' },
  { name: 'Veggie Burger', description: 'Grilled veggie patty', price: 107.99, image: 'https://delivery-l4p6.onrender.com/images/veggie_burger.jpg', type: 'veg' },
  { name: 'Chicken Burger', description: 'Crispy chicken burger', price: 108.49, image: 'https://delivery-l4p6.onrender.com/images/chicken_burger.webp', type: 'nonveg' },
  { name: 'Caesar Salad', description: 'Romaine, croutons, parmesan', price: 106.99, image: 'https://delivery-l4p6.onrender.com/images/caesar_salad.jpg', type: 'veg' },
  { name: 'Greek Salad', description: 'Feta, olives, cucumber', price: 107.49, image: 'https://delivery-l4p6.onrender.com/images/greek_salad.jpg', type: 'veg' },
  { name: 'Spaghetti Bolognese', description: 'Pasta with meat sauce', price: 110.99, image: 'https://delivery-l4p6.onrender.com/images/spaghetti_bolognese.jpeg', type: 'nonveg' },
  { name: 'Fettuccine Alfredo', description: 'Creamy Alfredo sauce', price: 111.49, image: 'https://delivery-l4p6.onrender.com/images/fettuccine_alfredo.jpg', type: 'veg' },
  { name: 'Chicken Tikka Masala', description: 'Spicy Indian curry', price: 112.99, image: 'https://delivery-l4p6.onrender.com/images/chicken_tikka_masala.jpg', type: 'nonveg' },
  { name: 'Paneer Butter Masala', description: 'Creamy paneer curry', price: 111.99, image: 'https://delivery-l4p6.onrender.com/images/paneer_butter_masala.jpg', type: 'veg' },
  { name: 'Sushi Roll', description: 'Assorted sushi', price: 113.99, image: 'https://delivery-l4p6.onrender.com/images/sushi_roll.jpg', type: 'nonveg' },
  { name: 'Tempura', description: 'Crispy fried veggies', price: 109.49, image: 'https://delivery-l4p6.onrender.com/images/tempura.jpg', type: 'veg' },
  { name: 'Pad Thai', description: 'Thai stir-fried noodles', price: 110.49, image: 'https://delivery-l4p6.onrender.com/images/pad_thai.jpg', type: 'veg' },
  { name: 'Green Curry', description: 'Spicy Thai curry', price: 111.49, image: 'https://delivery-l4p6.onrender.com/images/green_curry.jpg', type: 'veg' },
  { name: 'Tacos', description: 'Beef or veggie tacos', price: 108.99, image: 'https://delivery-l4p6.onrender.com/images/tacos.webp', type: 'nonveg' },
  { name: 'Burrito', description: 'Stuffed flour tortilla', price: 109.99, image: 'https://delivery-l4p6.onrender.com/images/burrito.jpg', type: 'nonveg' },
  { name: 'Falafel Wrap', description: 'Chickpea patties in wrap', price: 107.99, image: 'https://delivery-l4p6.onrender.com/images/falafel_wrap.png', type: 'veg' },
  { name: 'Shawarma', description: 'Middle Eastern wrap', price: 108.99, image: 'https://delivery-l4p6.onrender.com/images/shawarma.avif', type: 'nonveg' },
  { name: 'Fish and Chips', description: 'Fried fish, fries', price: 112.49, image: 'https://delivery-l4p6.onrender.com/images/fish_and_chips.jpg', type: 'nonveg' },
  { name: 'Grilled Salmon', description: 'Salmon fillet, veggies', price: 114.99, image: 'https://delivery-l4p6.onrender.com/images/grilled_salmon.jpg', type: 'nonveg' },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);

    let restaurant = await Restaurant.findOne();
    if (!restaurant) {
      restaurant = await Restaurant.create({
        name: 'Demo Restaurant',
        address: '123 Main St',
        image: ''
      });
    }

    await Food.deleteMany({});
    const foodDocs = await Food.insertMany(
      foods.map(food => ({
        ...food,
        restaurant: restaurant._id
      }))
    );

    restaurant.foods = foodDocs.map(f => f._id);
    await restaurant.save();

    console.log('✅ Seeded 20 food items with correct images.');
    process.exit();
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
}

seed();
