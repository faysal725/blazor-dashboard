import sql from "better-sqlite3";
import bcrypt from "bcryptjs";

const db = new sql("users.db");

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
const insertUser = db.prepare(
  "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)"
);
const findUserByEmail = db.prepare("SELECT * FROM users WHERE email = ?"); // For login or checking duplicates

function setAdminUser() {
  // Admin user details
  const name = "Admin User";
  const email = "admin@example.com";
  const password = "admin123"; // Plaintext password
  const role = "admin";

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Insert into the database
  try {
    insertUser.run(name, email, hashedPassword, role);
    console.log("Admin user inserted successfully!");
  } catch (error) {
    console.error("Error inserting admin user:", error.message);
  }
}

setAdminUser()

export { db, insertUser, findUserByEmail };
