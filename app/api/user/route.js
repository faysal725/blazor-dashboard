// app/api/user/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Your SQLite setup

export async function GET(req) {
  try {
    // User info from middleware
    const user = req.user;
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user data from SQLite
    const stmt = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?');
    const userData = stmt.get(user.id);

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}