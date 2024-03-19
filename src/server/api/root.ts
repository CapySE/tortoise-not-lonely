import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";
import { chatRouter } from "./routers/chat";
import { profileRouter } from "./routers/profile";
import { userRouter } from "./routers/user";
import { eventRouter } from "./routers/event";
import { adminRouter } from "./routers/admin";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  chat: chatRouter,
  auth: authRouter,
  profile: profileRouter,
  user: userRouter,
  event: eventRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
