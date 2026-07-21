import { headers } from 'next/headers';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

type TodosResponse = {
  success: boolean;
  data?: Todo[];
  error?: string;
};

type TodoResponse = {
  success: boolean;
  data?: Todo;
  message?: string;
  error?: string;
};

async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  return `${protocol}://${host}`;
}

export async function fetchTodos(): Promise<Todo[]> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/todos`, { cache: 'no-store' });
  const json: TodosResponse = await res.json();

  if (!json.success || !json.data) {
    return [];
  }

  return json.data;
}

export async function fetchTodo(id: string): Promise<Todo | null> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/todos/${id}`, { cache: 'no-store' });
  const json: TodoResponse = await res.json();

  if (!json.success || !json.data) {
    return null;
  }

  return json.data;
}
