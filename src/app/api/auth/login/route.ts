import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, password);

    if (user) {
      const response = NextResponse.json({ status: 'success', username });
      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });
      return response;
    }

    return NextResponse.json({ status: 'error', message: 'Identifiants incorrects' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ status: 'success' });
  response.cookies.delete('admin_session');
  return response;
}
