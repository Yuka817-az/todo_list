import fs from 'fs';
import path from 'path';

// データファイルのパス
const dataPath = path.join(process.cwd(), 'data', 'todos.json');

// データディレクトリとファイルの初期化
function ensureDataFile() {
  const dataDir = path.dirname(dataPath);
  
  // データディレクトリが存在しない場合は作成
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // データファイルが存在しない場合は作成
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([], null, 2));
  }
}

// Todoの型定義
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

// データを読み込む
function loadData(): Todo[] {
  ensureDataFile();
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('データの読み込みエラー:', error);
    return [];
  }
}

// データを保存する
function saveData(todos: Todo[]): void {
  ensureDataFile();
  try {
    fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error('データの保存エラー:', error);
    throw error;
  }
}

// 新しいIDを生成
function generateId(todos: Todo[]): number {
  if (todos.length === 0) return 1;
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

// 現在の日時を取得
function getCurrentDateTime(): string {
  return new Date().toISOString();
}

// すべてのTodoを取得
export function getAllTodos(): Todo[] {
  const todos = loadData();
  return todos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

// 新しいTodoを追加
export function addTodo(text: string): Todo {
  const todos = loadData();
  const newTodo: Todo = {
    id: generateId(todos),
    text: text.trim(),
    completed: false,
    created_at: getCurrentDateTime(),
    updated_at: getCurrentDateTime()
  };
  
  todos.push(newTodo);
  saveData(todos);
  return newTodo;
}

// Todoを削除
export function deleteTodo(id: number): boolean {
  const todos = loadData();
  const initialLength = todos.length;
  const filteredTodos = todos.filter(todo => todo.id !== id);
  
  if (filteredTodos.length < initialLength) {
    saveData(filteredTodos);
    return true;
  }
  
  return false;
}

// Todoを更新
export function updateTodo(id: number, text: string, completed?: boolean): Todo | null {
  const todos = loadData();
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return null;
  }
  
  const updatedTodo: Todo = {
    ...todos[todoIndex],
    text: text.trim(),
    updated_at: getCurrentDateTime()
  };
  
  if (completed !== undefined) {
    updatedTodo.completed = completed;
  }
  
  todos[todoIndex] = updatedTodo;
  saveData(todos);
  return updatedTodo;
}
