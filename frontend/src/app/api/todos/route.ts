import { NextRequest, NextResponse } from 'next/server';
import Todo from '@/app/models/Todo';
import { withDB } from '@/lib/api-helper';

// GET - 全Todo取得
export async function GET() {
  return withDB(async () => {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    return { todos };
  });
}

// POST - Todo作成
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title } = body;

  if (!title) {
    return NextResponse.json(
      { error: 'タイトルは必須です' },
      { status: 400 }
    );
  }

  return withDB(async () => {
    const todo = await Todo.create({ title });
    return { todo };
  }, 201);
}