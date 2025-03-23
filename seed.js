const bcrypt = require('bcryptjs');
const { insertUser } = require('./lib/db');

// Admin user details
const name = 'Admin User';
const email = 'admin@example.com';
const password = 'admin123'; // Plaintext password
const role = 'admin';

// Hash the password
const hashedPassword = bcrypt.hashSync(password, 10);

// Insert into the database
try {
  insertUser.run(name, email, hashedPassword, role);
  console.log('Admin user inserted successfully!');
} catch (error) {
  console.error('Error inserting admin user:', error.message);
}