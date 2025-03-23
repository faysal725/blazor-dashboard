import { jwtVerify } from 'jose';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function authenticate(headers) {
  // console.log(headers.get('cookie'))
  const cookieHeader = headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map((c) => c.split('='))
  );
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
  if (!decoded || !roles.includes(decoded.role)) {
    throw new Error('Insufficient permissions');
  }
}