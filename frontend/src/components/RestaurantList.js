import React from 'react';

const RestaurantList = ({ onSelect, selected }) => (
  <div className="restaurant-list">
    <button onClick={() => onSelect('')}
      className={selected === '' ? 'selected' : ''}>All</button>
    <button onClick={() => onSelect('veg')}
      className={selected === 'veg' ? 'selected' : ''}>Veg</button>
    <button onClick={() => onSelect('nonveg')}
      className={selected === 'nonveg' ? 'selected' : ''}>Non-Veg</button>
  </div>
);

export default RestaurantList; 