import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const fallbackImg = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80';

const getImagePath = (image) => {
  if (!image) return fallbackImg;
  const filename = image.split('/').pop();
  return `/images/${filename}`;
};

const FoodMenu = ({ foods }) => {
  const { cart, addToCart } = useContext(CartContext);
  const [snackbar, setSnackbar] = useState(false);
  const [snackFood, setSnackFood] = useState(null);
  const navigate = useNavigate();

  const handleAddToCart = (food) => {
    addToCart(food._id);
    setSnackFood(food);
    setSnackbar(true);
  };

  // Keep snackbar visible as long as the item is in the cart
  useEffect(() => {
    if (snackbar) {
      const timer = setTimeout(() => setSnackbar(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [snackbar]);

  return (
    <>
      <div className="food-menu">
        {foods.map(food => (
          <div key={food._id} className="food-item fade-in">
            <img src={getImagePath(food.image)} alt={food.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 6, marginBottom: 8 }} loading="lazy" onError={e => { e.target.onerror = null; e.target.src = fallbackImg; }} />
            <h4>{food.name}</h4>
            <p>{food.description}</p>
            <p>₹{food.price}</p>
            <button className="add-cart-btn" onClick={() => handleAddToCart(food)}>Add to Cart</button>
          </div>
        ))}
      </div>
      {snackbar && snackFood && (
        <div style={{ position: 'fixed', left: 0, right: 0, bottom: 30, margin: '0 auto', maxWidth: 340, background: '#22223b', color: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(34,34,59,0.18)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1000, animation: 'fadeInUp 0.3s' }}>
          <span>{snackFood.name} added to cart!</span>
          <button style={{ marginLeft: 18, background: '#fca311', color: '#22223b', border: 'none', borderRadius: 12, padding: '0.4rem 1.1rem', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/cart')}>Go to Cart</button>
        </div>
      )}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default FoodMenu; 