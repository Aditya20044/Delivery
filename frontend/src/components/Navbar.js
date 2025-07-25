import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// ✅ Fixed logo path — since it's in public/images/
const logoUrl = '/images/Deliver_Deli.jpeg';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img
          src={logoUrl}
          alt="logo"
          style={{ width: 36, height: 36, borderRadius: 8 }}
        />
        <Link
          to="/"
          style={{
            fontWeight: 700,
            fontSize: 22,
            color: '#fca311',
            textShadow: '0 1px 4px #2223',
          }}
        >
          DeliverDeli
        </Link>
      </div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        {user && <Link to="/orders">Orders</Link>}
        <Link to="/contact">Contact</Link>
        {user && user.role === 'admin' && <Link to="/admin">Admin</Link>}
        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
