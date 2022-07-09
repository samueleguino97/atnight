// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { orderRouter } from "./orders";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("orders.", orderRouter)
  .merge("example.", exampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
