import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json({ success: true, data: todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetched todos' },
      { status: 200 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();
    if (!title) {
      return NextResponse.json(
        { success: false, message: 'Title required' },
        { status: 400 },
      );
    }
    const todo = await prisma.todo.create({
      data: { title },
    });

    return NextResponse.json(
      { success: true, data: todo },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
        { success: false, error: 'Failed to create todo' },
        { status: 400 },
      );
  }
}

