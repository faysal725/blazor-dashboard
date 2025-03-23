import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function authenticate(headers) {
  const cookieHeader = headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map((c) => c.split('='))
  );
  const token = cookies.token;

  if (!token) {
    throw new Error('No token provided');
  }

  return jwt.verify(token, SECRET); // Returns decoded payload or throws
}

export function restrictTo(decoded, ...roles) {
  if (!decoded || !roles.includes(decoded.role)) {
    throw new Error('Insufficient permissions');
  }
}