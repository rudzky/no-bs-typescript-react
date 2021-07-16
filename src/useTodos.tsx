import { useCallback, useReducer, createContext, useContext } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type ActionType =
  | { type: "ADD_TODO"; text: string }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "REMOVE_TODO"; id: number };

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

const TodoContext = createContext<UseTodosManagerResult>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  removeTodo: () => {},
});

function useTodosManager(initialTodos: Todo[] = []): {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
} {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD_TODO":
        return [...state, { id: state.length, text: action.text, done: false }];

      case "TOGGLE_TODO":
        return state.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        });

      case "REMOVE_TODO":
        return state.filter((todo) => todo.id !== action.id);
      default:
        throw new Error();
    }
  }, initialTodos);

  const addTodo = useCallback((text: string) => {
    dispatch({ type: "ADD_TODO", text });
  }, []);

  const toggleTodo = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_TODO", id });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({ type: "REMOVE_TODO", id });
  }, []);

  return { todos, addTodo, toggleTodo, removeTodo };
}

export function TodosProvider({
  children,
  initialValue,
}: {
  children: React.ReactChild;
  initialValue?: Todo[];
}) {
  return (
    <TodoContext.Provider value={useTodosManager(initialValue)}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}
