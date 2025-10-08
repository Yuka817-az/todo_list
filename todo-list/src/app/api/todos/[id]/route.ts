import { NextRequest, NextResponse } from 'next/server';
import { deleteTodo, updateTodo } from '@/lib/database';

// DELETE /api/todos/[id] - Todoを削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid todo ID' },
        { status: 400 }
      );
    }

    const deleted = deleteTodo(id);
    
    if (deleted) {
      return NextResponse.json({ success: true, message: 'Todo deleted successfully' });
    } else {
      return NextResponse.json(
        { success: false, error: 'Todo not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}

// PUT /api/todos/[id] - Todoを更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid todo ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { text, completed } = body;

    if (text !== undefined && (typeof text !== 'string' || text.trim() === '')) {
      return NextResponse.json(
        { success: false, error: 'Text must be a non-empty string' },
        { status: 400 }
      );
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'Completed must be a boolean' },
        { status: 400 }
      );
    }

    const updatedTodo = updateTodo(id, text, completed);
    
    if (updatedTodo) {
      return NextResponse.json({ success: true, data: updatedTodo });
    } else {
      return NextResponse.json(
        { success: false, error: 'Todo not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}
