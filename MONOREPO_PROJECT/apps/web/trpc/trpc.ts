import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@MONOREPO_PROJECT/trpc';

export const trpc = createTRPCReact<AppRouter>()