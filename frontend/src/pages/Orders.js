import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import OrderHistory from '../components/OrderHistory';

const Orders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get('/orders/my', token);
      setOrders(res);
    };
    fetchOrders();
  }, [token]);

  return (
    <>
      <div className="app-attractive-bg" />
      <div className="app-bg-pattern" />
      <div className="app-content">
        <div className="orders-container">
          <div className="page-title-box">
            <h2 className="page-title">Order History</h2>
          </div>
          <OrderHistory orders={[...orders].reverse()} />
        </div>
      </div>
    </>
  );
};

export default Orders; 