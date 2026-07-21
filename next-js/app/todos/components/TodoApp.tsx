'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import type { Todo } from '@/app/lib/todos';

type TodoAppProps = {
  initialTodos: Todo[];
};

export default function TodoApp({ initialTodos }: TodoAppProps) {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) {
      setError('Title is required');
      return;
    }

    setError('');

    startTransition(async () => {
      try {
        const res = await fetch('/api/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: trimmed }),
        });

        const json = await res.json();

        if (!json.success || !json.data) {
          setError(json.message ?? json.error ?? 'Failed to create todo');
          return;
        }

        setTodos((current) => [json.data, ...current]);
        setTitle('');
      } catch {
        setError('Something went wrong. Please try again.');
      }
    });
  }

  function handleToggle(todo: Todo) {
    setError('');
    setPendingId(todo.id);

    startTransition(async () => {
      try {
        const res = await fetch(`/api/todos/${todo.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed: !todo.completed }),
        });

        const json = await res.json();

        if (!json.success || !json.data) {
          setError(json.message ?? json.error ?? 'Failed to update todo');
          return;
        }

        setTodos((current) =>
          current.map((item) => (item.id === todo.id ? json.data : item)),
        );
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setPendingId(null);
      }
    });
  }

  function handleDelete(todo: Todo) {
    if (!window.confirm(`Delete "${todo.title}"?`)) {
      return;
    }

    setError('');
    setPendingId(todo.id);

    startTransition(async () => {
      try {
        const res = await fetch(`/api/todos/${todo.id}`, {
          method: 'DELETE',
        });

        const json = await res.json();

        if (!json.success) {
          setError(json.message ?? json.error ?? 'Failed to delete todo');
          return;
        }

        setTodos((current) => current.filter((item) => item.id !== todo.id));
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setPendingId(null);
      }
    });
  }

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a new todo..."
          disabled={isPending}
          className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending && !pendingId ? 'Adding...' : 'Add Todo'}
        </button>
      </form>

      {error ? (
        <p className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <ul className="space-y-3">
        {todos.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/60 px-6 py-10 text-center text-zinc-400">
            No todos yet. Add your first one above.
          </li>
        ) : (
          todos.map((todo) => {
            const isItemPending = pendingId === todo.id;

            return (
              <li
                key={todo.id}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 px-5 py-4 transition hover:border-orange-500/40 hover:bg-zinc-900"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggle(todo)}
                    disabled={isPending}
                    aria-label={todo.completed ? 'Mark as pending' : 'Mark as completed'}
                    className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-60 ${
                      todo.completed
                        ? 'border-orange-400 bg-orange-400 text-zinc-950'
                        : 'border-zinc-600 bg-transparent hover:border-orange-400'
                    }`}
                  >
                    {todo.completed ? '✓' : null}
                  </button>
                  <div className="min-w-0">
                    <p
                      className={`truncate font-medium ${
                        todo.completed ? 'text-zinc-500 line-through' : 'text-zinc-100'
                      }`}
                    >
                      {todo.title}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {new Date(todo.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/todos/${todo.id}`}
                    className="rounded-lg px-3 py-1.5 text-sm font-medium text-orange-400 transition hover:bg-orange-500/10 hover:text-orange-300"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(todo)}
                    disabled={isPending}
                    className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isItemPending ? '...' : 'Delete'}
                  </button>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
