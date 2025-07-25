import React from 'react';

const OrderHistory = ({ orders }) => (
  <div className="order-history">
    {orders.length === 0 ? <p>No orders found.</p> : orders.map(order => (
      <div key={order._id} className="order-item">
        <h4>Order #{order._id}</h4>
        <ul>
          {order.items.map(item => (
            <li key={item.food._id}>{item.food.name} x {item.quantity}</li>
          ))}
        </ul>
        <p>Status: {order.status}</p>
        <p>Placed: {new Date(order.createdAt).toLocaleString()}</p>
      </div>
    ))}
  </div>
);

export default OrderHistory; 