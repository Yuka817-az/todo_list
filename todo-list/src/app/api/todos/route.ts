import { NextRequest, NextResponse } from 'next/server';
import { getAllTodos, addTodo, Todo } from '@/lib/database';

// GET /api/todos - すべてのTodoを取得
export async function GET() {
  try {
    const todos = await getAllTodos();
    return NextResponse.json({ success: true, data: todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// POST /api/todos - 新しいTodoを追加
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== 'string' || text.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Text is required' },
        { status: 400 }
      );
    }

    const newTodo = await addTodo(text.trim());
    return NextResponse.json({ success: true, data: newTodo }, { status: 201 });
  } catch (error) {
    console.error('Error adding todo:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add todo' },
      { status: 500 }
    );
  }
}
