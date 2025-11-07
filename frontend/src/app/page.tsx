'use client';

import { useState, useEffect } from 'react';

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  // Todo一覧取得
  const fetchTodos = async () => {
    try {
      const res = await fetch('/api/todos');
      const data = await res.json();
      setTodos(data.todos || []);
    } catch (error) {
      console.error('Todoの取得に失敗しました:', error);
    }
  };

  // Todo作成
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      setTodos([data.todo, ...todos]);
      setTitle('');
    } catch (error) {
      console.error('Todoの作成に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  // Todo完了状態切り替え
  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });
      const data = await res.json();
      setTodos(todos.map(todo => todo._id === id ? data.todo : todo));
    } catch (error) {
      console.error('Todoの更新に失敗しました:', error);
    }
  };

  // Todo削除
  const deleteTodo = async (id: string) => {
    try {
      await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Todoの削除に失敗しました:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-black dark:text-zinc-50">
          Todo App
        </h1>

        {/* 追加フォーム */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="新しいTodoを入力..."
              className="flex-1 px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-50 dark:text-black"
            >
              {loading ? '追加中...' : '追加'}
            </button>
          </div>
        </form>

        {/* Todo一覧 */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-zinc-500 dark:text-zinc-400">
              Todoがありません
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo._id, todo.completed)}
                  className="w-5 h-5"
                />
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? 'line-through text-zinc-400'
                      : 'text-zinc-900 dark:text-zinc-50'
                  }`}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded dark:hover:bg-red-900/20"
                >
                  削除
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}