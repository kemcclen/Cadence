import React, { useState } from 'react';
import axios from 'axios';
import '../component/signup.css';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await axios.post('/signup', { username, password });
      alert("Successfully signed up!"); 
      navigate('/login'); 
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <form className="signup" onSubmit={handleSignup}>
      <div className="signup__field">
        <i className="signup__icon fas fa-user"></i>
        <input type="text" className="signup__input" placeholder="User name / Email" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="signup__field">
        <i className="signup__icon fas fa-lock"></i>
        <input type="password" className="signup__input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="signup__field">
        <i className="signup__icon fas fa-lock"></i>
        <input type="password" className="signup__input" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      {error && <div className="error">{error}</div>}
      <button className="button signup__submit">
        <span className="button__text">Sign Up Now</span>
        <i className="button__icon fas fa-chevron-right"></i>
      </button>
    </form>
  );
};

export default Signup;