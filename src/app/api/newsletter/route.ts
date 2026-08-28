import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const subscribers = db.prepare(`
      SELECT id, email, created_at
      FROM newsletter 
      ORDER BY created_at DESC
    `).all();

    return NextResponse.json({ status: 'success', data: subscribers });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ status: 'error', message: 'Email requis' }, { status: 400 });
    }

    const stmt = db.prepare(`
      INSERT INTO newsletter (email) VALUES (?)
    `);

    stmt.run(email);
    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return NextResponse.json({ status: 'success', message: 'Déjà inscrit' });
    }
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
