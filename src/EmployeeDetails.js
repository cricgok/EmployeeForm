import React, { useState, useEffect } from 'react';
import './EmployeeDetails.css'; // Import the CSS file
import ChatbotComponent from './ChatbotComponent'; // Import the ChatbotComponent

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to track the selected employee
  const [showChatbot, setShowChatbot] = useState(false); // State to track whether to show the chatbot
  const [selectedFormat, setSelectedFormat] = useState(''); // State to track the selected download format

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

  // Function to toggle the display of the chatbot
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  // Function to handle downloading table data
  const handleDownload = () => {
    if (selectedFormat === 'csv') {
      downloadAsCsv();
    } else if (selectedFormat === 'json') {
      downloadAsJson();
    } // Add other download formats as needed
  };

  // Function to download table data as CSV
  const downloadAsCsv = () => {
    const csv = employees.map(employee => Object.values(employee).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employee_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Function to download table data as JSON
  const downloadAsJson = () => {
    const json = JSON.stringify(employees, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employee_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
            <tr key={employee.id} onClick={() => handleRowClick(employee)}>
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

      {selectedEmployee && (
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
      )}

      {showChatbot && <ChatbotComponent />}

      {/* Dropdown to select the download format */}
      <div className="download-dropdown">
        <select onChange={(e) => setSelectedFormat(e.target.value)}>
          <option value="">Select Format</option>
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>
        {/* Button to trigger the download */}
        <button onClick={handleDownload}>Download</button>
      </div>

      {/* Button to toggle chatbot visibility */}
      <button onClick={toggleChatbot} style={{ position: 'fixed', bottom: 20, right: 20 }}>
        AI
      </button>
    </div>
  );
};

export default EmployeeDetails;
