import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import api from '../utils/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (token) {
        const res = await api.get('/cart', token);
        setCart(res.items || []);
      } else {
        setCart([]);
      }
    };
    fetchCart();
  }, [token]);

  const addToCart = async (foodId, quantity = 1) => {
    if (token) {
      const res = await api.post('/cart/add', { foodId, quantity }, token);
      setCart(res.items);
    }
  };

  const removeFromCart = async (foodId) => {
    if (token) {
      const res = await api.post('/cart/remove', { foodId }, token);
      setCart(res.items || res.cart?.items || []);
    }
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}; 