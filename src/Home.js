import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="container">
        <h1 className="heading">Welcome to Employee Management System</h1>
        <div className="content">
          <p>
            Our Employee Management System provides you with powerful tools to streamline your HR processes and manage your workforce efficiently.
          </p>
          <p>
            With our system, you can easily add new employees, update their information, track attendance, manage salaries, and much more.
          </p>
          <p>
            Whether you're a small business or a large enterprise, our intuitive interface and comprehensive features make managing your employees a breeze.
          </p>
        </div>
        <div className="cta">
          <p>Ready to get started?</p>
          <Link to="/login" className="login-link">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
