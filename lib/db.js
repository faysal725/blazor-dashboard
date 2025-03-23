import sql from 'better-sqlite3';


const db = new sql('users.db');

// Updated table with name and email
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('user', 'admin')) DEFAULT 'user'
  )
`);

// Updated prepared statements
const insertUser = db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
const findUserByEmail = db.prepare('SELECT * FROM users WHERE email = ?'); // For login or checking duplicates

export { db, insertUser, findUserByEmail };