import React from 'react';

const CartItem = ({ item, onRemove }) => (
  <div className="cart-item cart-item-modern">
    <img src={item.food.image} alt={item.food.name} className="cart-food-img" />
    <div className="cart-food-info">
      <div className="cart-food-title">{item.food.name}</div>
      <div className="cart-food-price">₹{item.food.price} x {item.quantity}</div>
    </div>
    <button className="cart-remove-btn" onClick={() => onRemove(item.food._id)} title="Remove">
      <span role="img" aria-label="remove">🗑️</span>
    </button>
  </div>
);

export default CartItem; 