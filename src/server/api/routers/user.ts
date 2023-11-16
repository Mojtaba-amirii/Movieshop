import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  addPurchasedMovie: publicProcedure
    .input(z.object({ movieId: z.array(z.string()), userId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.user.update({
        where: {
          id: input.userId,
        },
        data: {
          purchasedMovies: {
            push: input.movieId,
          },
        },
      });
    }),
  getMyMovies: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.user.findFirst({
        where: {
          id: input.userId,
        },
        select: {
          purchasedMovies: true,
        },
      });
    }),
});
