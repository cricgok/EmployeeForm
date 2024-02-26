import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Admin from './Admin';
import EmployeeDetails from './EmployeeDetails';
import Employee from './Employee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employeedetails" element={<EmployeeDetails />} /> 
        
      </Routes>
    </Router>
  );
}

export default App;
