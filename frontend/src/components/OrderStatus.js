import React from 'react';

const OrderStatus = ({ orders, onStatusChange }) => (
  <div className="order-status-list">
    {orders.length === 0 ? <p>No orders found.</p> : orders.map(order => (
      <div key={order._id} className="order-status-item">
        <h4>Order #{order._id}</h4>
        <ul>
          {order.items.map(item => (
            <li key={item.food._id}>{item.food.name} x {item.quantity}</li>
          ))}
        </ul>
        <select value={order.status} onChange={e => onStatusChange(order._id, e.target.value)}>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <p>User: {order.user?.name || order.user}</p>
        <p>Placed: {new Date(order.createdAt).toLocaleString()}</p>
      </div>
    ))}
  </div>
);

export default OrderStatus; 