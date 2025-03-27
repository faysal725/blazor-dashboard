// lib/db.js
import sql from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const db = new sql('ecommerce.db'); // Changed to ecommerce.db for clarity

// Users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('user', 'admin')) DEFAULT 'user'
  )
`);

// Orders table
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    full_name TEXT,
    phone TEXT,
    address TEXT,
    delivery_charge REAL,
    product_qty INTEGER,
    subtotal REAL,
    total REAL,
    created_at INTEGER,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

// Order items table
db.exec(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    title TEXT,
    price REAL,
    quantity INTEGER,
    thumbnail TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id)
  )
`);

// Prepared statements for users
const insertUser = db.prepare(
  'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)'
);
const findUserByEmail = db.prepare('SELECT * FROM users WHERE email = ?');

// Prepared statements for orders
const insertOrder = db.prepare(`
  INSERT INTO orders (user_id, full_name, phone, address, delivery_charge, product_qty, subtotal, total, created_at, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
const insertOrderItem = db.prepare(`
  INSERT INTO order_items (order_id, product_id, title, price, quantity, thumbnail)
  VALUES (?, ?, ?, ?, ?, ?)
`);

// Seed admin user
function setAdminUser() {
  const name = 'Admin User';
  const email = 'admin@example.com';
  const password = 'admin123';
  const role = 'admin';

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const existingUser = findUserByEmail.get(email);
    if (!existingUser) {
      insertUser.run(name, email, hashedPassword, role);
      console.log('Admin user inserted successfully!');
    } else {
      console.log('Admin user already exists, skipping insertion.');
    }
  } catch (error) {
    console.error('Error inserting admin user:', error.message);
  }
}

setAdminUser();

export { db, insertUser, findUserByEmail, insertOrder, insertOrderItem };