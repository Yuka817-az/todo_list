"use client";

import { NextPage } from "next";
import { useState } from "react";
import "./globals.scss";

export default function Home() {
  const [text, setText] = useState<string>('')
  const [todos, setTodos] = useState<string[]>([]);

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  //追加ボタンを押したら新しいtodoが追加される
  const addTodos = () => {
    const newTodos = [...todos];
    newTodos.push(text);
    setTodos(newTodos);
    setText("");
  };

  //完了ボタンを押したらtodoが削除される
  const deleteTodo = (index: number) => {
    const newTodos = [...todos];
    //配列から要素除去
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <main>
        <h1>Todo List</h1>
        <div className="list_container">
          <div className="add_button">
            <input type="text" value={text} onChange={changeText} />
            <button onClick={addTodos}>追加</button>
          </div>

          <div>
            <ul>
              {todos.map((todo, index) => (
                <li key={todo}>
                  <div className="todo-item">
                    <p>{todo}</p>
                    <button onClick={() => deleteTodo(index)}>完了</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}