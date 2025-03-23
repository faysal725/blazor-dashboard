import { NextResponse } from 'next/server';
import { authenticate, restrictTo } from './lib/auth';

export function middleware(req) {
  try {
    const decoded = authenticate(req.headers);
    restrictTo(decoded, 'admin');
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: '/admin/:path*', // Protect all /admin routes
};