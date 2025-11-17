import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ShoppingCart, Star } from "lucide-react";
import { type FC, memo, useMemo, useState } from "react";

import { api } from "~/utils/api";
import { useSelector } from "~/redux/store";
import { MovieListSkeleton } from "./Skeleton";
import type { Movie, SearchProps } from "~/types/types";

const DEFAULT_POSTER = "/imgs/image-not-found.jpg";

const MovieList: FC<SearchProps> = ({ search, genre }) => {
  const { data: sessionData } = useSession();

  const { data: movies, isLoading: moviesLoading } =
    api.movies.first100.useQuery();

  const { data: myMoviesData, isLoading: myMoviesLoading } =
    api.user.getMyMovies.useQuery(
      { userId: sessionData?.user?.id ?? "" },
      { enabled: !!sessionData?.user?.id },
    );

  const cartMovies = useSelector((state) => state.cart.items);
  const myMoviesIds = myMoviesData?.purchasedMovies;

  const filteredMovies = useMemo(() => {
    if (!movies) return [];

    const validatedMovies = movies.map((movie) => ({
      ...movie,
      poster:
        movie.poster && movie.poster.trim() !== ""
          ? movie.poster
          : DEFAULT_POSTER,
    }));

    const nonPurchasedMovies = sessionData?.user?.id
      ? validatedMovies.filter((movie) => !myMoviesIds?.includes(movie.id))
      : validatedMovies;

    return nonPurchasedMovies.filter((movie) => {
      const searchMatch =
        !search || movie.title.toLowerCase().includes(search.toLowerCase());
      const genreMatch =
        !genre ||
        genre === "all" ||
        movie.genres.some((g) => g.toLowerCase() === genre.toLowerCase());
      return searchMatch && genreMatch;
    });
  }, [movies, sessionData?.user?.id, myMoviesIds, search, genre]);

  const isLoading = moviesLoading || (sessionData?.user?.id && myMoviesLoading);

  const isInCart = (movieId: string) =>
    cartMovies.some((cartMovie) => cartMovie.id === movieId);

  if (isLoading) return <MovieListSkeleton />;

  if (!filteredMovies.length) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            No movies found
          </h2>
          <p className="text-gray-500">
            {search || genre
              ? "Try adjusting your search or filter criteria"
              : "No movies available at the moment"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="container mx-auto px-4 py-8"
      aria-label="Movie collection"
    >
      <div className="mb-6">
        <h2 className="sr-only">Available Movies</h2>
        <p className="text-sm text-gray-600">
          Showing {filteredMovies.length} movie
          {filteredMovies.length !== 1 ? "s" : ""}
        </p>
      </div>

      <ul
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        role="list"
      >
        {filteredMovies.map((movie) => (
          <MovieCard
            key={`${movie.id}-${movie.poster}`}
            movie={movie}
            isInCart={isInCart(movie.id)}
          />
        ))}
      </ul>
    </section>
  );
};

interface MovieCardProps {
  movie: Movie;
  isInCart: boolean;
}

const MovieCard: FC<MovieCardProps> = memo(({ movie, isInCart }) => {
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  const moviePrice = movie.price ?? 0;
  const movieRating = movie.imdb?.rating?.toFixed(1) ?? "N/A";
  const genresText = movie.genres.join(", ");

  // Calculate imgSrc during render - no useEffect needed
  const imgSrc = hasError ? DEFAULT_POSTER : (movie.poster ?? DEFAULT_POSTER);

  return (
    <li className="group relative">
      <article
        className={`relative aspect-2/3 overflow-hidden rounded-lg bg-gray-100 shadow-md transition-all duration-300 hover:shadow-xl ${
          isInCart ? "opacity-70" : ""
        }`}
      >
        <Link
          href={{
            pathname: "/movie-details/[movie]",
            query: { price: moviePrice },
          }}
          as={`/movie-details/${movie.title}`}
          className="block h-full w-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          aria-label={`View details for ${movie.title}`}
        >
          <div className="relative h-full w-full">
            <Image
              src={imgSrc}
              alt={`${movie.title} movie poster`}
              fill
              priority
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={handleImageError}
              unoptimized={!imgSrc.startsWith("/")}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            {/* Movie info overlay */}
            <div className="absolute right-0 bottom-0 left-0 p-3 text-white">
              <h3 className="mb-1 line-clamp-2 text-sm leading-tight font-semibold md:text-base">
                {movie.title}
              </h3>

              {genresText && (
                <p className="mb-2 line-clamp-1 text-xs text-gray-300">
                  {genresText}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{movieRating}</span>
                </div>

                <span className="text-xs font-bold text-green-400">
                  {moviePrice}kr
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Cart indicator */}
        {isInCart && (
          <div
            className="absolute top-2 right-2 rounded-full bg-green-500 p-1.5 shadow-lg"
            aria-label="Item in cart"
          >
            <ShoppingCart className="h-3 w-3 text-white" />
          </div>
        )}
      </article>
    </li>
  );
});

MovieCard.displayName = "MovieCard";

export default memo(MovieList);
