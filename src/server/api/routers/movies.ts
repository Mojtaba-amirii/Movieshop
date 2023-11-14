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
  findById: publicProcedure
    .input(z.object({ movieIds: z.array(z.string()) }))
    .query(({ ctx, input }) => {
      return ctx.db.movies.findMany({
        where: {
          id: {
            in: input.movieIds
          },
        },
      });
    }),
});
