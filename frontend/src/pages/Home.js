import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import RestaurantList from '../components/RestaurantList';
import FoodMenu from '../components/FoodMenu';

const heroBg = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/restaurants');
      setRestaurants(res);
      const foodRes = await api.get('/foods');
      setAllFoods(foodRes);
      setFoods(foodRes);
    };
    fetchData();
  }, []);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (!e.target.value) {
      setFoods(allFoods);
      return;
    }
    const res = await api.get(`/foods/search?q=${e.target.value}`);
    setFoods(res);
  };

  const vegNames = [
    'Margherita Pizza',
    'Pepperoni Pizza',
    'Veggie Burger',
    'Caesar Salad',
    'Greek Salad',
    'Spaghetti Bolognese',
    'Fettuccine Alfredo',
    'Paneer Butter Masala',
    'Sushi Roll',
    'Pad Thai',
    'Green Curry',
    'Tacos',
    'Burrito',
    'Shawarma',
    'Grilled Salmon'
  ];
  const handleTypeFilter = (type) => {
    setSelectedRestaurant(type);
    if (type === 'veg') {
      setFoods(allFoods.filter(f => vegNames.includes(f.name)));
    } else if (type === 'nonveg') {
      setFoods(allFoods.filter(f => !vegNames.includes(f.name)));
    } else {
      setFoods(allFoods);
    }
  };

  return (
    <>
      <div className="side-food-logo left" style={{ top: '25%', left: '2vw', transform: 'translateY(-50%) rotate(-12deg)' }}>🍕</div>
      <div className="side-food-logo left" style={{ top: '60%', left: '3vw', transform: 'translateY(-50%) rotate(8deg)' }}>🍔</div>
      <div className="side-food-logo left" style={{ top: '80%', left: '1vw', transform: 'translateY(-50%) rotate(-6deg)' }}>🍟</div>
      <div className="side-food-logo right" style={{ top: '30%', right: '2vw', transform: 'translateY(-50%) rotate(10deg)' }}>🥤</div>
      <div className="side-food-logo right" style={{ top: '65%', right: '3vw', transform: 'translateY(-50%) rotate(-7deg)' }}>🍕</div>
      <div className="side-food-logo right" style={{ top: '85%', right: '1vw', transform: 'translateY(-50%) rotate(5deg)' }}>🍔</div>
      <div className="app-attractive-bg" />
      <div className="app-bg-pattern" />
      <div className="app-content" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="home-container">
          <div className="hero-banner" style={{
            background: `linear-gradient(90deg,rgba(34,34,59,0.7),rgba(252,163,17,0.3)), url(${heroBg}) center/cover no-repeat`,
            borderRadius: 18,
            color: '#fff',
            padding: '2.5rem 2rem',
            marginBottom: 32,
            textAlign: 'center',
            boxShadow: '0 4px 24px rgba(34,34,59,0.10)'
          }}>
            <h1 style={{ fontSize: 38, fontWeight: 800, margin: 0, letterSpacing: 1 }}>Delicious Food, Delivered Fast</h1>
            <p style={{ fontSize: 20, margin: '1rem 0 0.5rem 0', fontWeight: 400 }}>Order from the best restaurants in town. Fresh, hot, and at your door in minutes.</p>
            <span style={{ background: '#fca311', color: '#22223b', borderRadius: 20, padding: '0.5rem 1.5rem', fontWeight: 600, fontSize: 18, boxShadow: '0 2px 8px rgba(252,163,17,0.13)' }}>Try DeliverDeli Now!</span>
          </div>
          <h2>Restaurants</h2>
          <RestaurantList onSelect={handleTypeFilter} selected={selectedRestaurant} />
          <input type="text" placeholder="Search food..." value={search} onChange={handleSearch} />
          <FoodMenu foods={foods} />
        </div>
      </div>
    </>
  );
};

export default Home; 