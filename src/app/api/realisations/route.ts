import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const realisations = db.prepare(`
      SELECT id, title, category, image, description, created_at
      FROM realisations 
      ORDER BY created_at DESC
    `).all();

    return NextResponse.json({ status: 'success', data: realisations });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, image, description } = body;

    if (!title || !image) {
      return NextResponse.json({ status: 'error', message: 'Titre et image requis' }, { status: 400 });
    }

    const stmt = db.prepare(`
      INSERT INTO realisations (title, category, image, description)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(title, category || 'Autre', image, description || title);

    return NextResponse.json({ status: 'success', id: result.lastInsertRowid });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
