import { NextResponse } from 'next/server';
import client, { initDB } from '@/lib/db';

export async function GET() {
  try {
    await initDB();
    const result = await client.execute(`
      SELECT id, email, created_at
      FROM newsletter 
      ORDER BY created_at DESC
    `);

    return NextResponse.json({ status: 'success', data: result.rows });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDB();
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ status: 'error', message: 'Email requis' }, { status: 400 });
    }

    await client.execute({
      sql: 'INSERT INTO newsletter (email) VALUES (?)',
      args: [email]
    });

    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      return NextResponse.json({ status: 'success', message: 'Déjà inscrit' });
    }
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
