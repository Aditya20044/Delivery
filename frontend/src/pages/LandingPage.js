import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const logoUrl = 'https://delivery-l4p6.onrender.com/images/Deliver_Deli.jpeg';
const bgUrl = 'https://delivery-l4p6.onrender.com/images/Background.jpeg';

const slogans = [
  'Craving? We Deliver Happiness!',
  'Your Favorite Food, Just a Click Away',
  'Fast. Fresh. Delivered.',
];

const LandingPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let res;
    if (isSignup) {
      res = await api.post('/auth/signup', { name, username, email, password });
    } else {
      res = await api.post('/auth/login', { email, password });
    }
    if (res.token) {
      login(res.user, res.token);
      navigate('/');
    } else {
      setError(res.message || (isSignup ? 'Signup failed' : 'Login failed'));
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Blurred background image */}
      <img src={bgUrl} alt="background" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: 0, filter: 'blur(12px) brightness(0.7)' }} />
      {/* Decorative pattern overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'url("https://www.transparenttextures.com/patterns/food.png") repeat', opacity: 0.07, zIndex: 1 }} />
      <style>{`
@media (max-width: 600px) {
  .landing-slogan-1 { font-size: 18px !important; margin-bottom: 6px !important; }
  .landing-slogan-2 { font-size: 15px !important; margin-bottom: 4px !important; }
  .landing-slogan-3 { font-size: 13px !important; margin-bottom: 6px !important; }
  .landing-logo { width: 60px !important; height: 60px !important; margin-bottom: 14px !important; }
  .landing-title-box { padding: 0.4rem 1.1rem !important; border-radius: 12px !important; margin-bottom: 10px !important; }
  .landing-title { font-size: 22px !important; }
  .landing-signin { font-size: 13px !important; margin-bottom: 16px !important; }
  .landing-login-btn { font-size: 13px !important; padding: 0.4rem 1.1rem !important; border-radius: 12px !important; }
}
`}</style>
      <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: 18, textAlign: 'center' }}>
          <div className="landing-slogan-1" style={{ fontSize: 30, color: '#fca311', fontWeight: 800, fontFamily: 'sans-serif', marginBottom: 10, textShadow: '0 2px 10px #fffbe6, 0 1px 2px #fca31122' }}>Craving? We Deliver Happiness!</div>
          <div className="landing-slogan-2" style={{ fontSize: 24, color: '#22223b', fontWeight: 700, fontFamily: 'sans-serif', marginBottom: 8, textShadow: '0 2px 10px #fffbe6' }}>Your Favorite Food, Just a Click Away</div>
          <div className="landing-slogan-3" style={{ fontSize: 22, color: '#27ae60', fontWeight: 700, fontFamily: 'sans-serif', marginBottom: 12, textShadow: '0 2px 10px #fffbe6' }}>Fast. Fresh. Delivered.</div>
        </div>
        <img src={logoUrl} alt="DeliverDeli Logo" className="landing-logo" style={{ width: 120, height: 120, borderRadius: 24, marginBottom: 28, boxShadow: '0 3px 16px rgba(34,34,59,0.13)' }} />
        <div className="landing-title-box" style={{ background: 'linear-gradient(90deg, #fffbe6 60%, #ffe5b4 100%)', borderRadius: 22, boxShadow: '0 3px 16px rgba(252,163,17,0.13)', padding: '0.9rem 2.5rem', marginBottom: 20, display: 'inline-block' }}>
          <h1 className="landing-title" style={{ fontSize: 44, fontWeight: 800, color: 'red', margin: 0, letterSpacing: 1, textShadow: '0 3px 10px #fffbe6, 0 1px 2px #fca31122' }}>DeliverDeli</h1>
        </div>
        <p className="landing-signin" style={{ fontSize: 22, color: '#22223b', marginBottom: 32, fontWeight: 700 }}>Sign in to start your food journey!</p>
        {!showForm ? (
          <button className="landing-login-btn" style={{ background: '#fca311', color: '#22223b', border: 'none', borderRadius: 22, padding: '0.9rem 2.5rem', fontWeight: 800, fontSize: 22, boxShadow: '0 3px 12px rgba(252,163,17,0.15)' }} onClick={() => setShowForm(true)}>Login</button>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 320, background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 2px 12px rgba(34,34,59,0.10)' }}>
            {isSignup && <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />}
            {isSignup && <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />}
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" style={{ background: '#fca311', color: '#22223b', border: 'none', borderRadius: 20, padding: '0.7rem 2.2rem', fontWeight: 700, fontSize: 18 }}> {isSignup ? 'Signup' : 'Login'} </button>
            {error && <p style={{ color: '#e74c3c', margin: 0 }}>{error}</p>}
            <div style={{ marginTop: 8, textAlign: 'center' }}>
              {isSignup ? (
                <span>Already have an account? <button type="button" style={{ color: '#fca311', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer' }} onClick={() => setIsSignup(false)}>Login</button></span>
              ) : (
                <span>New user? <button type="button" style={{ color: '#fca311', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer' }} onClick={() => setIsSignup(true)}>Signup</button></span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LandingPage; 