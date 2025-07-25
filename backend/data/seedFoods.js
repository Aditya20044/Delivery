const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Food = require('../models/Food');
const Restaurant = require('../models/Restaurant');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const foods = [
  { name: 'Margherita Pizza', description: 'Classic cheese pizza', price: 8.99, image: 'http://localhost:4000/images/margherita_pizza.jpg', type: 'veg' },
  { name: 'Pepperoni Pizza', description: 'Pepperoni and cheese', price: 9.99, image: 'http://localhost:4000/images/pepperoni_pizza.webp', type: 'nonveg' },
  { name: 'Veggie Burger', description: 'Grilled veggie patty', price: 7.99, image: 'http://localhost:4000/images/veggie_burger.jpg', type: 'veg' },
  { name: 'Chicken Burger', description: 'Crispy chicken burger', price: 8.49, image: 'http://localhost:4000/images/chicken_burger.webp', type: 'nonveg' },
  { name: 'Caesar Salad', description: 'Romaine, croutons, parmesan', price: 6.99, image: 'http://localhost:4000/images/caesar_salad.jpg', type: 'veg' },
  { name: 'Greek Salad', description: 'Feta, olives, cucumber', price: 7.49, image: 'http://localhost:4000/images/greek_salad.jpg', type: 'veg' },
  { name: 'Spaghetti Bolognese', description: 'Pasta with meat sauce', price: 10.99, image: 'http://localhost:4000/images/spaghetti_bolognese.jpeg', type: 'nonveg' },
  { name: 'Fettuccine Alfredo', description: 'Creamy Alfredo sauce', price: 11.49, image: 'http://localhost:4000/images/fettuccine_alfredo.jpg', type: 'veg' },
  { name: 'Chicken Tikka Masala', description: 'Spicy Indian curry', price: 12.99, image: 'http://localhost:4000/images/chicken_tikka_masala.jpg', type: 'nonveg' },
  { name: 'Paneer Butter Masala', description: 'Creamy paneer curry', price: 11.99, image: 'http://localhost:4000/images/paneer_butter_masala.jpg', type: 'veg' },
  { name: 'Sushi Roll', description: 'Assorted sushi', price: 13.99, image: 'http://localhost:4000/images/sushi_roll.jpg', type: 'nonveg' },
  { name: 'Tempura', description: 'Crispy fried veggies', price: 9.49, image: 'http://localhost:4000/images/tempura.jpg', type: 'veg' },
  { name: 'Pad Thai', description: 'Thai stir-fried noodles', price: 10.49, image: 'http://localhost:4000/images/pad_thai.jpg', type: 'veg' },
  { name: 'Green Curry', description: 'Spicy Thai curry', price: 11.49, image: 'http://localhost:4000/images/green_curry.jpg', type: 'veg' },
  { name: 'Tacos', description: 'Beef or veggie tacos', price: 8.99, image: 'http://localhost:4000/images/tacos.webp', type: 'nonveg' },
  { name: 'Burrito', description: 'Stuffed flour tortilla', price: 9.99, image: 'http://localhost:4000/images/burrito.jpg', type: 'nonveg' },
  { name: 'Falafel Wrap', description: 'Chickpea patties in wrap', price: 7.99, image: 'http://localhost:4000/images/falafel_wrap.png', type: 'veg' },
  { name: 'Shawarma', description: 'Middle Eastern wrap', price: 8.99, image: 'http://localhost:4000/images/shawarma.avif', type: 'nonveg' },
  { name: 'Fish and Chips', description: 'Fried fish, fries', price: 12.49, image: 'http://localhost:4000/images/fish_and_chips.jpg', type: 'nonveg' },
  { name: 'Grilled Salmon', description: 'Salmon fillet, veggies', price: 14.99, image: 'http://localhost:4000/images/grilled_salmon.jpg', type: 'nonveg' },
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
