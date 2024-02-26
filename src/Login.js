
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Admin";
import "./Employee";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'Admin@123' && password === 'Admin@123') {
      navigate('/admin');
      alert("Logged in as Admin!");
    } else {
      navigate('/employee');
      alert("Logged in as Employee!");
    }
  };

  return (
    <div className='login-container'>
      <h2 className='login-header'>Login</h2>
      <form onSubmit={handleSubmit} className='login-form'>
        <div className='form-group'>
          <label htmlFor="username" className='form-label'>Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className='form-input' />
        </div>
        <div className='form-group'>
          <label htmlFor="password" className='form-label'>Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-input' />
        </div>
        <button type="submit" className='login-button'>Login</button>
      </form>
    </div>
  );
}

export default Login;