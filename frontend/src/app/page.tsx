'use client';

import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export default function Home() {
  const { todos, loading, createTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-black dark:text-zinc-50">
          Todo App
        </h1>
        <TodoForm onSubmit={createTodo} loading={loading} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </div>
  );
}