import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

type Params = { params: Promise<{ id: string }> };

async function getTodoById(id: string) {
  return prisma.todo.findUnique({
    where: { id },
  });
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Bhai params nhi mil rha hai ',
      });
    }

    const todo = await getTodoById(id);

    if (!todo) {
      return NextResponse.json(
        {
          success: false,
          message: 'Todo not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: todo,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch todo' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Todo id is required' },
        { status: 400 },
      );
    }

    const existing = await getTodoById(id);

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Todo not found' },
        { status: 404 },
      );
    }

    const body = await request.json();
    const { title, completed } = body as { title?: string; completed?: boolean };

    if (title === undefined && completed === undefined) {
      return NextResponse.json(
        { success: false, message: 'Title or completed status is required' },
        { status: 400 },
      );
    }

    if (title !== undefined && !title.trim()) {
      return NextResponse.json(
        { success: false, message: 'Title cannot be empty' },
        { status: 400 },
      );
    }

    const todo = await prisma.todo.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title: title.trim() } : {}),
        ...(completed !== undefined ? { completed } : {}),
      },
    });

    return NextResponse.json({ success: true, data: todo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Todo id is required' },
        { status: 400 },
      );
    }

    const existing = await getTodoById(id);

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Todo not found' },
        { status: 404 },
      );
    }

    const todo = await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, data: todo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete todo' }, { status: 500 });
  }
}
