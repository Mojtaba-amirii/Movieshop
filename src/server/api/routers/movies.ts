import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
  first100: publicProcedure.query(async ({ ctx }) => {
    const movies = (await ctx.db.movies.findMany({ take: 100 })) as Array<{
      type: string;
      title: string;
      id: string;
      poster: string | null;
      cast: string[];
      countries: string[];
      directors: string[];
      plot: string | null;
      fullplot: string | null;
      genres: string[];
      languages: string[];
      lastupdated: string;
      metacritic: number | null;
      imdb: { id: number; rating: number | null; votes: number };
      tomatoes:
        | ({ viewer: { rating: number } } & { lastUpdated: string })
        | null;
      price?: number;
    }>;
    return movies.map((movie) => ({
      ...movie,
      price:
        movie.price ?? (movie.imdb?.rating ? movie.imdb.rating * 10 + 50 : 100),
    }));
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
            in: input.movieIds,
          },
        },
      });
    }),
});
