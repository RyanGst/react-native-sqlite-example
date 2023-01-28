import React, {PropsWithChildren, useCallback, useEffect} from 'react';
import {useRef} from 'react';
import TodoRepository from '../repositories/todo/todo.repository';
import {ITodo} from '../types/Todo';

interface TodoContextProps {
  todos: ITodo[];
  addTodo: (todo: Partial<ITodo>) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (todo: ITodo) => void;
}

const TodoContext = React.createContext({} as TodoContextProps);

export const TodoProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [todos, setTodos] = React.useState<ITodo[]>([]);

  const todoRepository = useRef(new TodoRepository()).current;

  const loadTodos = useCallback(async () => {
    const dbTodos = await todoRepository.selectAll();
    setTodos(dbTodos);
  }, [todoRepository]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = (todo: Partial<ITodo>) => {
    todoRepository.create(todo);

    loadTodos();
  };

  const removeTodo = (id: number) => {
    todoRepository.delete(id);
    loadTodos();
  };

  const toggleTodo = (todo: ITodo) => {
    todoRepository.update({
      ...todo,
      completed: !todo.completed,
    });

    loadTodos();
  };

  const value: TodoContextProps = {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

function useTodo() {
  const context = React.useContext<TodoContextProps>(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}

export {useTodo};
