import React, { useState, useEffect } from 'react';
import './Employee.css';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [sortOption, setSortOption] = useState('');
  const [sortedEmployees, setSortedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch('http://localhost:5000/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        const data = await response.json();
        setEmployees(data);
        setTotalCount(data.length);
      } catch (error) {
        console.error('Error fetching employee data:', error.message);
      }
    };

    fetchEmployeeData();
  }, []);

  useEffect(() => {
    const filterAndSortEmployees = () => {
      let filteredData = [...employees];
      for (const columnName in filterOptions) {
        const filterValue = filterOptions[columnName];
        filteredData = filteredData.filter(employee => {
          return employee[columnName].toLowerCase().includes(filterValue.toLowerCase());
        });
      }

      if (sortOption) {
        filteredData.sort((a, b) => {
          if (a[sortOption] < b[sortOption]) return -1;
          if (a[sortOption] > b[sortOption]) return 1;
          return 0;
        });
      }

      setSortedEmployees(filteredData);
      setTotalCount(filteredData.length);
    };

    filterAndSortEmployees();
  }, [employees, filterOptions, sortOption]);

  const handleFilterChange = (columnName, value) => {
    setFilterOptions({
      ...filterOptions,
      [columnName]: value,
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const clearFilters = () => {
    setFilterOptions({});
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <div className="employee-container">
      <h2>Employee List</h2>
      <div className="filter-options">
        <div className="filter-item">
          <label>Name:</label>
          <input type="text" onChange={(e) => handleFilterChange('name', e.target.value)} />
        </div>
        <div className="filter-item">
          <label>Employee ID:</label>
          <input type="text" onChange={(e) => handleFilterChange('employeeId', e.target.value)} />
        </div>
        <div className="filter-item">
          <label>Salary:</label>
          <input type="text" onChange={(e) => handleFilterChange('salary', e.target.value)} />
        </div>
        <div className="filter-item">
          <label>Designation:</label>
          <input type="text" onChange={(e) => handleFilterChange('designation', e.target.value)} />
        </div>
        <button onClick={clearFilters}>Clear Filters</button>
      </div>
      <div className="sort-options">
        <label>Sort By:</label>
        <select onChange={handleSortChange}>
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="employeeId">Employee ID</option>
          <option value="salary">Salary</option>
          <option value="designation">Designation</option>
        </select>
      </div>
      <p>Total Employees: {totalCount}</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Salary</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map(employee => (
            <tr key={employee.id} onClick={() => handleEmployeeClick(employee)}>
              <td>{employee.name}</td>
              <td>{employee.employeeId}</td>
              <td>{employee.salary}</td>
              <td>{employee.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedEmployee && (
        <div className="employee-form">
          <h3>Employee Details</h3>
          <p><strong>Name:</strong> {selectedEmployee.name}</p>
          <p><strong>Employee ID:</strong> {selectedEmployee.employeeId}</p>
          <p><strong>Salary:</strong> {selectedEmployee.salary}</p>
          <p><strong>Designation:</strong> {selectedEmployee.designation}</p>
        </div>
      )}
    </div>
  );
};

export default Employee;
