import { useState, FormEvent } from 'react';

interface TodoFormProps {
  onSubmit: (title: string) => Promise<void>;
  loading: boolean;
}

export default function TodoForm({ onSubmit, loading }: TodoFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onSubmit(title);
    setTitle('');
  };

  return (
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
  );
}