import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, insertUser } from '@/lib/db';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    }

    const existingUser = findUserByEmail.get(email);
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'Email already registered' }), { status: 409 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = insertUser.run(name, email, hashedPassword, 'user');
    const userId = result.lastInsertRowid;

    const token = jwt.sign({ id: userId, email, role: 'user' }, SECRET, { expiresIn: '1h' });

    return new Response(JSON.stringify({ message: 'Registration successful' }), {
      status: 201,
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}