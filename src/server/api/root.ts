import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth/auth.router";
import { userRouter } from "./routers/user/user.router";
import { toolRouter } from "./routers/tool/tool.router";
import { switchRouter } from "./routers/switch/switch.router";
import { deviceRouter } from "./routers/device/device.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  tool: toolRouter,
  switch: switchRouter,
  device: deviceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
