const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Gokul@123',
  database: 'employee_management',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database');
});

app.post('/submit-form', (req, res) => {
  const { name, employeeId, dept, gender, dob, email, bloodGroup, address, salary, designation } = req.body;

  const sql = 'INSERT INTO employees (name, employeeId, dept, gender, dob, email, bloodGroup, address, salary, designation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, employeeId, dept, gender, dob, email, bloodGroup, address, salary, designation], (error, result) => {
      if (error) {
          console.error('Error adding employee:', error);
          res.status(500).json({ error: 'Failed to add employee' });
          return;
      }
      res.json({ message: 'Employee added successfully' });
  });
});


app.post('/query-employee', async (req, res) => {
  const { query } = req.body;
  try {
    // Query the database to get employee details based on the user query
    const employeeDetails = await db.queryEmployee(query);
    res.json({ success: true, data: employeeDetails });
  } catch (error) {
    console.error('Error querying employee:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


app.get('/employees', (req, res) => {
  const sql = 'SELECT * FROM employees';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching employees:', err);
      res.status(500).json({ error: 'Error fetching employees' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM employees WHERE id = ?';
  db.query(sql, [id], (error, result) => {
    if (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ error: 'Failed to delete employee' });
      return;
    }
    res.json({ message: 'Employee deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
