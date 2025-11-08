import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function withDB<T>(
  handler: () => Promise<T>,
  statusCode: number = 200
): Promise<NextResponse> {
  try {
    await connectDB();
    const result = await handler();
    return NextResponse.json(result, { status: statusCode });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'エラーが発生しました' },
      { status: 500 }
    );
  }
}