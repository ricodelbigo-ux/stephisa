import { NextResponse } from 'next/server';
import client, { initDB } from '@/lib/db';

export async function GET() {
  try {
    await initDB();
    const result = await client.execute(`
      SELECT id, title, category, image, description, created_at
      FROM realisations 
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
    const { title, category, image, description } = body;

    if (!title || !image) {
      return NextResponse.json({ status: 'error', message: 'Titre et image requis' }, { status: 400 });
    }

    const result = await client.execute({
      sql: `INSERT INTO realisations (title, category, image, description)
            VALUES (?, ?, ?, ?)`,
      args: [title, category || 'Autre', image, description || title]
    });

    return NextResponse.json({ status: 'success', id: Number(result.lastInsertRowid) });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
