import React, { useCallback } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTodos, addTodo, removeTodo } from "./store";
// import { useTodos } from "./useTodos";

export default function App() {
  // const { todos, addTodo, toggleTodo, removeTodo } = useTodos();

  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch(addTodo(newTodoRef.current.value));
      newTodoRef.current.value = "";
    }
  }, [dispatch]);

  return (
    <div>
      <header>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add new Todo!</button>
      </header>
      <main>
        {todos.map((todo) => (
          <div key={todo.id}>
            {todo.text}
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Remove
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
