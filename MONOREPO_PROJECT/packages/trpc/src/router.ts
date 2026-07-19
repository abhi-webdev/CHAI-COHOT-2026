import { publicProcedure, router } from './trpc.js';

export const appRouter = router({
  // Public procedure router
  health : publicProcedure.query(() => {
    return {
        message: "Hello i am working"
    }
  })
    
});

export type AppRouter = typeof appRouter;