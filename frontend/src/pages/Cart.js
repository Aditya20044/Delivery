import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const [message, setMessage] = React.useState('');
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.food.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = async () => {
    const res = await api.post('/orders/place', {}, token);
    if (res._id) {
      setMessage('Order placed successfully!');
      setOrderPlaced(true);
      clearCart(); // Clear cart in context, no reload
      setTimeout(() => setMessage(''), 2500);
    } else {
      setMessage(res.message || 'Failed to place order');
    }
  };

  return (
    <>
      <div className="app-attractive-bg" />
      <div className="app-bg-pattern" />
      <div className="app-content">
        <div className="cart-container cart-modern">
          <div className="page-title-box">
            <h2 className="page-title">Your Cart</h2>
          </div>
          {cart.length === 0 ? <p>Cart is empty</p> : (
            <>
              <div className="cart-list">
                {cart.map(item => (
                  <CartItem key={item.food._id} item={item} onRemove={removeFromCart} />
                ))}
              </div>
              <div className="cart-summary">
                <div><b>Items:</b> {itemCount}</div>
                <div><b>Total:</b> ₹{total.toFixed(2)}</div>
                <button className="cart-order-btn" onClick={handlePlaceOrder}>Place Order</button>
              </div>
            </>
          )}
          {orderPlaced && (
            <div className="order-success popIn">
              <p>Order placed successfully!</p>
              <button onClick={() => navigate('/orders')}>View My Order</button>
            </div>
          )}
          {message && <div className="cart-message fade-in">{message}</div>}
        </div>
      </div>
    </>
  );
};

export default Cart; 