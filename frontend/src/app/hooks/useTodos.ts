import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
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
  const createTodo = async (title: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      setTodos([data.todo, ...todos]);
      return data.todo;
    } catch (error) {
      console.error('Todoの作成に失敗しました:', error);
      throw error;
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
      checkResponse(res);
      const data = await res.json();
      setTodos(todos.map(todo => todo._id === id ? data.todo : todo));
    } catch (error) {
      console.error('Todoの更新に失敗しました:', error);
    }
  };

  // Todo削除
  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      checkResponse(res);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Todoの削除に失敗しました:', error);
    }
  };

  // レスポンスチェックヘルパー
  const checkResponse = (res: Response) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    createTodo,
    toggleTodo,
    deleteTodo,
  };
}