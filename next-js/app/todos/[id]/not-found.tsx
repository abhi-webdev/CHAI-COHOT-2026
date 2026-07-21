import Link from 'next/link';

export default function TodoNotFound() {
  return (
    <main className="flex min-h-full items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-orange-500">
          Not found
        </p>
        <h1 className="text-2xl font-bold text-zinc-50">Todo not found</h1>
        <p className="mt-3 text-zinc-400">
          This todo may have been removed or the link is invalid.
        </p>
        <Link
          href="/todos"
          className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-zinc-950 transition hover:bg-orange-400"
        >
          Back to todos
        </Link>
      </div>
    </main>
  );
}
