"use client";

import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import "./globals.scss";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const { data: session } = useSession();
  const [text, setText] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // コンポーネントマウント時にTodoを取得
  useEffect(() => {
    fetchTodos();
  }, []);

  // Todoを取得する関数
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/todos');
      const data = await response.json();

      if (data.success) {
        setTodos(data.data);
      } else {
        setError(data.error || 'Todoの取得に失敗しました');
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  //追加ボタンを押したら新しいtodoが追加される
  const addTodos = async () => {
    if (!text.trim()) return;

    try {
      setError('');
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setTodos([data.data, ...todos]);
        setText("");
      } else {
        setError(data.error || 'Todoの追加に失敗しました');
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました');
    }
  };

  //完了ボタンを押したらtodoが削除される
  const deleteTodo = async (id: number) => {
    try {
      setError('');
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setTodos(todos.filter(todo => todo.id !== id));
      } else {
        setError(data.error || 'Todoの削除に失敗しました');
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました');
    }
  };

  return (
    <>
      <main>
        {session && (
          <div className="user_container">
            <span >
              {session.user?.email || 'ユーザー'}
            </span>
            <button className="logout_button"
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
            >
              ログアウト
            </button>
          </div>
        )}
        <h1 className="header_title">Todo List</h1>
        <div className="list_container">
          {error && (
            <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
              {error}
            </div>
          )}

          <div className="add_button">
            <input
              type="text"
              value={text}
              onChange={changeText}
              placeholder="新しいTodoを入力してください"
              disabled={loading}
              className="input_text"
            />
            <button onClick={addTodos} disabled={loading || !text.trim()}>
              {loading ? '追加中...' : '追加'}
            </button>
          </div>

          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                読み込み中...
              </div>
            ) : (
              <ul>
                {todos.length === 0 ? (
                  <li style={{ textAlign: 'center', padding: '20px', color: '#666', listStyle: 'none' }}>
                    Todoがありません。新しいTodoを追加してください。
                  </li>
                ) : (
                  todos.map((todo) => (
                    <li key={todo.id}>
                      <div className="todo-item">
                        <p>{todo.text}</p>
                        <button onClick={() => deleteTodo(todo.id)}>完了</button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
      </main>
    </>
  );
}