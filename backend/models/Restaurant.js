const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String },
  foods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', RestaurantSchema);

