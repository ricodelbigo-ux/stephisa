import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const contacts = db.prepare(`
      SELECT id, name, email, phone, service, subject, message, status, created_at
      FROM contacts 
      ORDER BY created_at DESC
    `).all();

    return NextResponse.json({ status: 'success', data: contacts });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ status: 'error', message: 'Nom, email et message requis' }, { status: 400 });
    }

    const stmt = db.prepare(`
      INSERT INTO contacts (name, email, phone, service, subject, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(name, email, phone || '', service || 'Général', subject || '', message);

    return NextResponse.json({ status: 'success', id: result.lastInsertRowid });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
