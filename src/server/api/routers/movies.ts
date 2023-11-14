import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const moviesRouter = createTRPCRouter({
  /* createExercise: publicProcedure
    .input(z.object({ name: z.string(), duration: z.number() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.movies.create({
        data: {
          name: input.name,
          duration: input.duration,
        },
      });
    }), */
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.movies.findMany();
  }),
  first100: publicProcedure.query(({ ctx }) => {
    return ctx.db.movies.findMany({
      take: 100,
    });
  }),
  findByTitle: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.movies.findFirst({
        where: {
          title: {
            equals: input.title,
          },
        },
      });
    }),
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
