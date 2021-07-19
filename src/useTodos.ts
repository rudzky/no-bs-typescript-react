import create from "zustand";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const useTodos = create<{
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (toggleId: number) => void;
  removeTodo: (removeId: number) => void;
}>((set) => ({
  todos: [],
  addTodo: (text: string) =>
    set((state) => ({
      ...state,
      todos: [...state.todos, { id: state.todos.length, text, done: false }],
    })),
  toggleTodo: (toggleId: number) =>
    set((state) => ({
      ...state,
      todos: state.todos.map((todo) => {
        if (todo.id === toggleId) {
          return {
            ...todo,
            done: !todo.done,
          };
        }
        return todo;
      }),
    })),
  removeTodo: (removeId: number) =>
    set((state) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== removeId),
    })),
}));

export default useTodos;
