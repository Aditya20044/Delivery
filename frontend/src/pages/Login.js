import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
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
      res = await api.post('/auth/signup', { name, email, password });
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
    <div className="form-container">
      <h2>{isSignup ? 'Signup' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        )}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
        {error && <p className="error">{error}</p>}
      </form>
      <button onClick={() => setIsSignup(!isSignup)} style={{ marginTop: '1rem' }}>
        {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
      </button>
    </div>
  );
};

export default AuthPage; 