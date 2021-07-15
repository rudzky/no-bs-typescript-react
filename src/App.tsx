import React, { useCallback } from "react";
import { useRef } from "react";
import { useTodos } from "./useTodos";

export default function App() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

  return (
    <div>
      <header>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add new Todo!</button>
      </header>
      <main>
        {todos.map((todo) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </div>
        ))}
      </main>
    </div>
  );
}
