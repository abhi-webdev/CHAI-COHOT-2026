import { initTRPC } from '@trpc/server';

const t = initTRPC.create()

export const router = t.router;  // router -> function decleare
export const publicProcedure = t.procedure;  // function 