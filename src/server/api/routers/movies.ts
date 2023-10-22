// import { z } from "zod";

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
});
