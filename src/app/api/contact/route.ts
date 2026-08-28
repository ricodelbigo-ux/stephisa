import { NextResponse } from 'next/server';
import client, { initDB } from '@/lib/db';

export async function GET() {
  try {
    await initDB();
    const result = await client.execute(`
      SELECT id, name, email, phone, service, subject, message, status, created_at
      FROM contacts 
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
    const { name, email, phone, service, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ status: 'error', message: 'Nom, email et message requis' }, { status: 400 });
    }

    const result = await client.execute({
      sql: `INSERT INTO contacts (name, email, phone, service, subject, message)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [name, email, phone || '', service || 'Général', subject || '', message]
    });

    return NextResponse.json({ status: 'success', id: Number(result.lastInsertRowid) });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
