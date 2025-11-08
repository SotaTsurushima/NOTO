import { NextRequest, NextResponse } from 'next/server';
import Todo from '@/app/models/Todo';
import { withDB } from '@/lib/api-helper';

// PUT - Todo更新
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  return withDB(async () => {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );
    if (!todo) return notFoundResponse();
    return { todo };
  });
}

// DELETE - Todo削除
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return withDB(async () => {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return notFoundResponse();
    return { message: 'Todoを削除しました' };
  });
}

// 404エラーレスポンスを返すヘルパー関数
function notFoundResponse() {
  return NextResponse.json(
    { error: 'Todoが見つかりません' },
    { status: 404 }
  );
}