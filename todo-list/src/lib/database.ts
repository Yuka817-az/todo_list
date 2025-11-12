import { prisma } from './prisma';

// Todoの型定義
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  created_at: string; // ISO string format
  updated_at: string; // ISO string format
}

// すべてのTodoを取得
export async function getAllTodos(userId?: number): Promise<Todo[]> {
  try {
    const todos = await prisma.todo.findMany({
      where: userId ? { userId } : undefined,
      orderBy: {
        created_at: 'desc'
      }
    });
    return todos.map(todo => ({
      id: todo.id,
      text: todo.text,
      completed: todo.completed,
      created_at: todo.created_at.toISOString(),
      updated_at: todo.updated_at.toISOString()
    }));
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

// 新しいTodoを追加
export async function addTodo(text: string, userId: number = 1): Promise<Todo> {
  try {
    const newTodo = await prisma.todo.create({
      data: {
        text: text.trim(),
        completed: false,
        userId: userId
      }
    });
    
    return {
      id: newTodo.id,
      text: newTodo.text,
      completed: newTodo.completed,
      created_at: newTodo.created_at.toISOString(),
      updated_at: newTodo.updated_at.toISOString()
    };
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
}

// Todoを削除
export async function deleteTodo(id: number): Promise<boolean> {
  try {
    const result = await prisma.todo.delete({
      where: { id }
    });
    return !!result;
  } catch (error) {
    console.error('Error deleting todo:', error);
    return false;
  }
}

// Todoを更新
export async function updateTodo(id: number, text: string, completed?: boolean): Promise<Todo | null> {
  try {
    const updateData: { text?: string; completed?: boolean } = {};
    
    if (text !== undefined) {
      updateData.text = text.trim();
    }
    
    if (completed !== undefined) {
      updateData.completed = completed;
    }
    
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateData
    });
    
    return {
      id: updatedTodo.id,
      text: updatedTodo.text,
      completed: updatedTodo.completed,
      created_at: updatedTodo.created_at.toISOString(),
      updated_at: updatedTodo.updated_at.toISOString()
    };
  } catch (error) {
    console.error('Error updating todo:', error);
    return null;
  }
}
