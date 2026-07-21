'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { Todo } from '@/app/lib/todos';

type TodoDetailClientProps = {
  initialTodo: Todo;
};

export default function TodoDetailClient({ initialTodo }: TodoDetailClientProps) {
  const router = useRouter();
  const [todo, setTodo] = useState(initialTodo);
  const [title, setTitle] = useState(initialTodo.title);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  async function handleUpdate(updates: { title?: string; completed?: boolean }) {
    setError('');

    startTransition(async () => {
      try {
        const res = await fetch(`/api/todos/${todo.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });

        const json = await res.json();

        if (!json.success || !json.data) {
          setError(json.message ?? json.error ?? 'Failed to update todo');
          return;
        }

        setTodo(json.data);
        setTitle(json.data.title);
      } catch {
        setError('Something went wrong. Please try again.');
      }
    });
  }

  function handleSaveTitle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) {
      setError('Title is required');
      return;
    }

    if (trimmed === todo.title) {
      return;
    }

    handleUpdate({ title: trimmed });
  }

  function handleToggleCompleted() {
    handleUpdate({ completed: !todo.completed });
  }

  function handleDelete() {
    if (!window.confirm('Delete this todo?')) {
      return;
    }

    setError('');

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

        router.push('/todos');
        router.refresh();
      } catch {
        setError('Something went wrong. Please try again.');
      }
    });
  }

  return (
    <article className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl shadow-black/20">
      <div className="mb-6 flex items-center gap-3">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            todo.completed
              ? 'bg-orange-500/15 text-orange-400'
              : 'bg-zinc-800 text-zinc-400'
          }`}
        >
          {todo.completed ? 'Completed' : 'Pending'}
        </span>
        <span className="text-xs text-zinc-500">ID: {todo.id}</span>
      </div>

      <h1
        className={`text-3xl font-bold tracking-tight ${
          todo.completed ? 'text-zinc-500 line-through' : 'text-zinc-50'
        }`}
      >
        {todo.title}
      </h1>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-zinc-500">Created</dt>
          <dd className="mt-1 font-medium text-zinc-200">
            {new Date(todo.createdAt).toLocaleString()}
          </dd>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-zinc-500">Updated</dt>
          <dd className="mt-1 font-medium text-zinc-200">
            {new Date(todo.updatedAt).toLocaleString()}
          </dd>
        </div>
      </dl>

      <div className="mt-8 space-y-6 border-t border-zinc-800 pt-8">
        <form onSubmit={handleSaveTitle} className="space-y-3">
          <label htmlFor="todo-title" className="text-xs uppercase tracking-wide text-zinc-500">
            Edit title
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="todo-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={isPending}
              className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Save
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleToggleCompleted}
            disabled={isPending}
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-orange-500/40 hover:text-orange-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Mark as {todo.completed ? 'pending' : 'completed'}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Delete todo
          </button>
        </div>

        {error ? (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        ) : null}
      </div>
    </article>
  );
}
