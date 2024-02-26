import React, { useState, useEffect } from 'react';
import './EmployeeDetails.css'; // Import the CSS file

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to track the selected employee

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch('http://localhost:5000/employees');
      if (!response.ok) {
        throw new Error('Failed to fetch employee data');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employee data:', error.message);
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:5000/employees/${employeeId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      setEmployees(employees.filter((employee) => employee.id !== employeeId));
      console.log('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error.message);
    }
  };

  // Function to handle row click event
  const handleRowClick = (employee) => {
    setSelectedEmployee(employee); // Set the selected employee
  };

  // Function to render employee details when a row is clicked
  const renderEmployeeDetails = () => {
    if (selectedEmployee) {
      return (
        <div className="employee-details">
          <h3>Employee Details</h3>
          <p><strong>ID:</strong> {selectedEmployee.id}</p>
          <p><strong>Name:</strong> {selectedEmployee.name}</p>
          <p><strong>Date of Birth:</strong> {selectedEmployee.dob}</p>
          <p><strong>Department:</strong> {selectedEmployee.dept}</p>
          <p><strong>Salary:</strong> {selectedEmployee.salary}</p>
          <p><strong>Designation:</strong> {selectedEmployee.designation}</p>
          <button onClick={() => handleDelete(selectedEmployee.id)}>Delete</button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="employee-details-container">
      <h2>Employee Details</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Date of Birth</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Designation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} onClick={() => handleRowClick(employee)}> {/* Add onClick event handler */}
              <td>{employee.name}</td>
              <td>{employee.id}</td>
              <td>{employee.dob}</td>
              <td>{employee.dept}</td>
              <td>{employee.salary}</td>
              <td>{employee.designation}</td>
              <td>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderEmployeeDetails()} {/* Render selected employee details */}
    </div>
  );
};

export default EmployeeDetails;
