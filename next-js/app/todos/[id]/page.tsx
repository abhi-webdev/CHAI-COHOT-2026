import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchTodo } from '@/app/lib/todos';
import TodoDetailClient from '../components/TodoDetailClient';

type TodoDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TodoDetailPage({ params }: TodoDetailPageProps) {
  const { id } = await params;
  const todo = await fetchTodo(id);

  if (!todo) {
    notFound();
  }

  return (
    <main className="min-h-full bg-zinc-950 px-4 py-12 text-zinc-100">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/todos"
          className="mb-8 inline-flex text-sm text-zinc-500 transition hover:text-orange-400"
        >
          ← Back to todos
        </Link>

        <TodoDetailClient initialTodo={todo} />
      </div>
    </main>
  );
}
