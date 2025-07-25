import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import OrderStatus from '../components/OrderStatus';

const AdminDashboard = () => {
  const { token, user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      api.get('/orders/all', token).then(setOrders);
      api.get('/contacts', token).then(setContacts);
    }
  }, [token, user]);

  const handleStatusChange = async (orderId, status) => {
    await api.patch(`/orders/${orderId}/status`, { status }, token);
    const updated = await api.get('/orders/all', token);
    setOrders(updated);
  };

  if (!user || user.role !== 'admin') return <p>Access denied</p>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <h3>All Orders</h3>
      <OrderStatus orders={orders} onStatusChange={handleStatusChange} />
      <h3>Contact Messages</h3>
      <ul>
        {contacts.map(msg => (
          <li key={msg._id}><b>{msg.name}</b> ({msg.email}): {msg.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard; 