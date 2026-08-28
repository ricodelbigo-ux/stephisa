import { NextResponse } from 'next/server';
import client, { initDB } from '@/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initDB();
    const { id } = await params;
    await client.execute({
      sql: 'DELETE FROM blogs WHERE id = ?',
      args: [id]
    });
    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initDB();
    const { id } = await params;
    const body = await request.json();
    const { title, excerpt, content, image, category, author, status } = body;

    await client.execute({
      sql: `UPDATE blogs 
            SET title = ?, excerpt = ?, content = ?, image = ?, category = ?, author = ?, status = ?
            WHERE id = ?`,
      args: [title, excerpt, content, image, category, author, status, id]
    });

    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
