import React, { type FC, memo, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ShoppingCart, Star } from "lucide-react";

import { api } from "~/utils/api";
import type { Movie, SearchProps } from "~/types/types";
import { useSelector } from "~/redux/store";
import { MovieListSkeleton } from "./Skeleton";

const MovieList: FC<SearchProps> = ({ search, genre }) => {
  const { data: sessionData } = useSession();
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const myMoviesIds = api.user.getMyMovies.useQuery(
    { userId: sessionData?.user?.id ?? "" },
    { enabled: !!sessionData },
  ).data?.purchasedMovies;

  const cartMovies = useSelector((state) => state.cart.items);
  const movies = api.movies.first100.useQuery().data;

  useEffect(() => {
    if (movies) {
      const validatedMovies = movies.map((movie) => ({
        ...movie,
        poster: movie.poster ?? "/imgs/image-not-found.jpg",
      }));
      const nonPurchasedMovies = sessionData
        ? validatedMovies.filter((movie) => !myMoviesIds?.includes(movie.id))
        : validatedMovies;

      const searchFilteredMovies = nonPurchasedMovies.filter((movie) => {
        const isSearchMatch =
          !search || movie.title.toLowerCase().includes(search.toLowerCase());
        const isGenreMatch =
          !genre ||
          genre === "all" ||
          movie.genres.some((g) => g.toLowerCase() === genre.toLowerCase());
        return isSearchMatch && isGenreMatch;
      });

      setFilteredMovies(searchFilteredMovies);
      setIsLoading(false);
    }
  }, [movies, sessionData, myMoviesIds, search, genre]);

  if (isLoading) return <MovieListSkeleton />;

  return (
    <section className="container mx-auto px-4 py-8">
      <ul className="grid grid-cols-2 gap-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredMovies.map((movie) => (
          <li
            key={movie.id}
            className="relative max-h-80 min-h-44 w-full overflow-hidden rounded-lg bg-gray-300 shadow-lg"
          >
            <Link
              href={{
                pathname: "/movie-details/[movie]",
                query: { price: movie.price },
              }}
              as={`/movie-details/${movie.title}`}
            >
              <div
                className={`h-full w-full ${
                  cartMovies.some(
                    (cartMovie: Movie) => cartMovie.id === movie.id,
                  ) && "opacity-40"
                }`}
              >
                <Image
                  src={movie.poster ?? "/imgs/image-not-found.jpg"}
                  alt={movie.title}
                  width={250}
                  height={350}
                  priority
                  unoptimized
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/imgs/image-not-found.jpg";
                  }}
                  className="h-auto w-full object-cover transition-opacity duration-300 hover:opacity-75"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="mb-1 text-lg font-semibold text-white">
                  {movie.title}
                </h3>
                <h4 className="mb-1 text-sm text-gray-300">
                  {movie.genres.join(", ")}
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">
                      {movie.imdb?.rating?.toFixed(1) ?? "N/A"}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-green-400">
                    {movie.price}kr
                  </span>
                </div>
              </div>
              {cartMovies.some(
                (cartMovie: Movie) => cartMovie.id === movie.id,
              ) && (
                <div className="absolute right-2 top-2 rounded-full bg-green-500 p-2">
                  <ShoppingCart className="h-4 w-4 text-white" />
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default memo(MovieList);
