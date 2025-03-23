import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import { findUserByEmail } from '@/lib/db';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req) {
  const { email, password } = await req.json();
  const user = findUserByEmail.get(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  const secret = new TextEncoder().encode(SECRET);
  const token = await new SignJWT({ id: user.id, email, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  return new Response(JSON.stringify({ message: 'Login successful' }), {
    status: 200,
    headers: {
      'Set-Cookie': `token=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=3600`,
    },
  });
}