const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

const mongoDBConnectionString = 'mongodb+srv://omar:omar@cluster0.rsdgr1i.mongodb.net/flutter_app_db';

mongoose.connect(mongoDBConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a mongoose model for the Admin
const Admin = mongoose.model('Admin', {
  name: String,
  email: String,
  password: String,
});

// Express route handler for registering a new admin
app.post('/api/admin/register', async (req, res) => {
  try {
    // Assuming req.body contains the admin data
    const { name, email, password, confirmPassword } = req.body;

    // Validate data (You should add more validation logic)
    if (!name || !email || !password || password !== confirmPassword) {
      return res.status(400).json({ error: 'Invalid data provided' });
    }

    // Create a new admin instance
    const newAdmin = new Admin({ name, email, password });

    // Save the admin to the 'admins' collection in MongoDB
    await newAdmin.save();

    // Respond with a success status
    return res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});