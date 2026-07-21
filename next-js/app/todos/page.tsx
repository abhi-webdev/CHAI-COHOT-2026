import Link from 'next/link';
import { fetchTodos } from '@/app/lib/todos';
import TodoApp from './components/TodoApp';

export default async function TodosPage() {
  const todos = await fetchTodos();

  return (
    <main className="min-h-full bg-zinc-950 px-4 py-12 text-zinc-100">
      <div className="mx-auto flex w-full max-w-2xl flex-col">
        <div className="mb-10">
          <Link
            href="/"
            className="mb-6 inline-flex text-sm text-zinc-500 transition hover:text-orange-400"
          >
            ← Back home
          </Link>

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-orange-500">
                Tasks
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-zinc-50">Todos</h1>
              <p className="mt-2 text-zinc-400">
                Server-rendered list powered by your API routes.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-center">
              <p className="text-2xl font-bold text-orange-400">{todos.length}</p>
              <p className="text-xs uppercase tracking-wide text-zinc-500">Total</p>
            </div>
          </div>
        </div>

        <TodoApp initialTodos={todos} />
      </div>
    </main>
  );
}
