import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../component/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleSubmit}>
            <div className="login__field">
              <input
                type="email"
                placeholder="Email"
                className="login__input"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="login__field">
              <input
                type="password"
                placeholder="Password"
                className="login__input"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {error && <div>{error}</div>}
            <button type="submit" className="login__submit">
              Login
            </button>
          </form>
          <div className="signup-link">
            <Link to="/signup" className="signup">Sign Up Instead</Link> 
          </div>
        </div>
        <div className="screen__background">
          <div className="screen__background__shape1"></div>
          <div className="screen__background__shape2"></div>
          <div className="screen__background__shape3"></div>
          <div className="screen__background__shape4"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
