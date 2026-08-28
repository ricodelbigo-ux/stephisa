import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const blogs = db.prepare(`
      SELECT id, title, slug, excerpt, content, image, category, author, status, views, created_at
      FROM blogs 
      ORDER BY created_at DESC
    `).all();

    return NextResponse.json({ status: 'success', data: blogs });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, excerpt, content, image, category, author, status } = body;

    if (!title || !content) {
      return NextResponse.json({ status: 'error', message: 'Titre et contenu requis' }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const stmt = db.prepare(`
      INSERT INTO blogs (title, slug, excerpt, content, image, category, author, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      title,
      slug,
      excerpt || title,
      content,
      image || '/assets/img/heros.png',
      category || 'Agriculture',
      author || 'Direction STEPHISA',
      status || 'published'
    );

    return NextResponse.json({ status: 'success', id: result.lastInsertRowid });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
