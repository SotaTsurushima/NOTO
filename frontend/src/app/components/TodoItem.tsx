import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, todo.completed)}
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
        onClick={() => onDelete(todo._id)}
        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded dark:hover:bg-red-900/20"
      >
        削除
      </button>
    </div>
  );
}