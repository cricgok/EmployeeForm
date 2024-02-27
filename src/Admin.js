import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        employeeId: '',
        dept: '',
        gender: '',
        dob: '',
        email: '',
        bloodGroup: '',
        address: '',
        salary: '',
        designation: '',
        description: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            try {
                console.log('Form submitted successfully');
                setEmployeeData({
                    name: '',
                    employeeId: '',
                    dept: '',
                    gender: '',
                    dob: '',
                    email: '',
                    bloodGroup: '',
                    address: '',
                    salary: '',
                    designation: '',
                    description: '',
                });
                setErrors({});
            } catch (error) {
                console.error('Error submitting form:', error.message);
            }
        } else {
            setErrors(errors);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!employeeData.name) {
            errors.name = 'Name is required';
        }
        if (!employeeData.employeeId) {
            errors.employeeId = 'Employee ID is required';
        }
        if (!employeeData.dept) {
            errors.dept = 'Department is required';
        }
        if (!employeeData.gender) {
            errors.gender = 'Gender is required';
        }
        if (!employeeData.dob) {
            errors.dob = 'Date of Birth is required';
        } else {
            const dobDate = new Date(employeeData.dob);
            const today = new Date();
            const age = today.getFullYear() - dobDate.getFullYear();
            if (age < 21) {
                errors.dob = 'Employee must be at least 21 years old';
            }
        }
        if (!employeeData.email) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(employeeData.email)) {
            errors.email = 'Invalid email format';
        }
        if (!employeeData.bloodGroup) {
            errors.bloodGroup = 'Blood Group is required';
        } else if (!isValidBloodGroup(employeeData.bloodGroup)) {
            errors.bloodGroup = 'Invalid blood group. Please enter a valid blood group.';
        }
        if (!employeeData.address) {
            errors.address = 'Address is required';
        }
        if (!employeeData.salary) {
            errors.salary = 'Salary is required';
        } else if (employeeData.salary <= 100000) {
            errors.salary = 'Salary must be greater than 1 lakh';
        }
        if (!employeeData.designation) {
            errors.designation = 'Designation is required';
        }
        return errors;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidBloodGroup = (bloodGroup) => {
        const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        return validBloodGroups.includes(bloodGroup.toUpperCase());
    };

    return (
        <form onSubmit={handleSubmit} className='employee-form-container'>
            <h1 className='head-form'>Employee Form</h1>
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={employeeData.name}
                    onChange={handleChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div>
                <label>Employee ID:</label>
                <input
                    type="text"
                    name="employeeId"
                    value={employeeData.employeeId}
                    onChange={handleChange}
                />
                {errors.employeeId && <span className="error">{errors.employeeId}</span>}
            </div>
            <div>
                <label>Department:</label>
                <input
                    type="text"
                    name="dept"
                    value={employeeData.dept}
                    onChange={handleChange}
                />
                {errors.dept && <span className="error">{errors.dept}</span>}
            </div>
            <div>
                <label>Gender:</label>
                <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={employeeData.gender === 'Male'}
                    onChange={handleChange}
                /> Male
                <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={employeeData.gender === 'Female'}
                    onChange={handleChange}
                /> Female
                {errors.gender && <span className="error">{errors.gender}</span>}
            </div>
            <div>
                <label>Date of Birth:</label>
                <input
                    type="date"
                    name="dob"
                    value={employeeData.dob}
                    onChange={handleChange}
                />
                {errors.dob && <span className="error">{errors.dob}</span>}
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={employeeData.email}
                    onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div>
                <label>Blood Group:</label>
                <input
                    type="text"
                    name="bloodGroup"
                    value={employeeData.bloodGroup}
                    onChange={handleChange}
                />
                {errors.bloodGroup && <span className="error">{errors.bloodGroup}</span>}
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    name="address"
                    value={employeeData.address}
                    onChange={handleChange}
                />
                {errors.address && <span className="error">{errors.address}</span>}
            </div>
            <div>
                <label>Salary:</label>
                <input
                    type="number"
                    name="salary"
                    value={employeeData.salary}
                    onChange={handleChange}
                />
                {errors.salary && <span className="error">{errors.salary}</span>}
            </div>
            <div>
                <label>Designation:</label>
                <input
                    type="text"
                    name="designation"
                    value={employeeData.designation}
                    onChange={handleChange}
                />
                {errors.designation && <span className="error">{errors.designation}</span>}
            </div>





            <div className="form-group">
  <label>Description:</label>
  <textarea
    name="description"
    value={employeeData.description}
    onChange={handleChange}
    className="description-input" // Add the description-input class here
  />
</div>

            <button type="submit" className="submit-button">Submit </button>
            <Link to="/employeedetails" className="details-link">Employee Details</Link>
        </form>
    );
};

export default Admin;
