import { NextResponse } from 'next/server';
import client, { initDB } from '@/lib/db';

export async function POST(request: Request) {
  try {
    await initDB();
    const { username, password } = await request.json();

    const result = await client.execute({
      sql: 'SELECT * FROM users WHERE username = ? AND password = ?',
      args: [username, password]
    });

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const response = NextResponse.json({ status: 'success', username: user.username });
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
