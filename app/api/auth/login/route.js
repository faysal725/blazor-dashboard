import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { findUserByEmail } from '@/lib/db';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req) {
  const { email, password } = await req.json();
  const user = findUserByEmail.get(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  const token = jwt.sign({ id: user.id, email, role: user.role }, SECRET, { expiresIn: '1h' });

  return new Response(JSON.stringify({ message: 'Login successful' }), {
    status: 200,
    headers: {
      'Set-Cookie': `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`,
    },
  });
}