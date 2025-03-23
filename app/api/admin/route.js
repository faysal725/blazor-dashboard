import { authenticate, restrictTo } from '@/lib/db';

export async function GET(req) {
  try {
    const decoded = authenticate(req.headers);
    restrictTo(decoded, 'admin');
    return new Response(JSON.stringify({ message: 'Welcome, admin!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.message === 'Insufficient permissions' ? 403 : 401,
    });
  }
}