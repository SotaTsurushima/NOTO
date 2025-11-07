import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Todo from '@/app/models/Todo';

// GET - 全Todo取得
export async function GET() {
  try {
    await connectDB();
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Todoの取得に失敗しました' },
      { status: 500 }
    );
  }
}

// POST - Todo作成
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'タイトルは必須です' },
        { status: 400 }
      );
    }

    const todo = await Todo.create({ title });
    return NextResponse.json({ todo }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Todoの作成に失敗しました' },
      { status: 500 }
    );
  }
}