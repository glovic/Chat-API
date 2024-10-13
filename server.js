const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Make sure to include body-parser if you use it

app.use(bodyParser.json());

// Sample user database (replace with your database logic)
const users = [];

// User registration route
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  // Here, you'd typically add the user to your database
  users.push({ username, email, password }); // For testing purposes
  res.status(201).json({ message: 'User registered' });
});

module.exports = app;

