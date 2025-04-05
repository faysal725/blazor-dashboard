import { removeUserData } from '@/features/userSlice';
import { jwtVerify } from 'jose';
import { useDispatch } from 'react-redux';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function authenticate(headers) {
  console.log(headers.get('cookie'), '------','this is cookie')
  const cookieHeader = headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map((c) => c.split('='))
  );
  console.log(cookies.token, '------','this is token')
  const token = cookies.token;

  if (!token) {
    throw new Error('No token provided');
  }

  // Convert SECRET to Uint8Array for jose
  const secret = new TextEncoder().encode(SECRET);

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload; // Returns decoded payload
  } catch (error) {
    throw new Error('Invalid token'); // Or handle specific errors
  }
}

export function restrictTo(decoded, ...roles) {
  // console.log(decoded, roles, 'restrict to')
  if (!decoded || !roles.includes(decoded.role)) {
    throw new Error('Insufficient permissions');
  }
}

