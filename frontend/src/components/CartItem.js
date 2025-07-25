import React from 'react';

const fallbackImg = '/fallback_food.jpg';

// Dynamically builds the image URL from the backend
const getImagePath = (image) => {
  if (!image) return fallbackImg;
  if (image.startsWith('http')) return image;
  return `${process.env.REACT_APP_API_URL}/food_images/${image}`;
};

const CartItem = ({ item, onRemove }) => {
  const imageUrl = getImagePath(item.food.image);
  console.log('Cart image URL:', imageUrl, 'Original:', item.food.image);

  return (
    <div className="cart-item cart-item-modern">
      <img
        src={imageUrl}
        alt={item.food.name}
        className="cart-food-img"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImg;
        }}
      />
      <div className="cart-food-info">
        <div className="cart-food-title">{item.food.name}</div>
        <div className="cart-food-price">
          ₹{item.food.price} x {item.quantity}
        </div>
      </div>
      <button
        className="cart-remove-btn"
        onClick={() => onRemove(item.food._id)}
        title="Remove"
      >
        <span role="img" aria-label="remove">🗑️</span>
      </button>
    </div>
  );
};

export default CartItem;
