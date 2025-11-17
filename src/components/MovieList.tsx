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
        <div className="flex flex-col items-center justify-center rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 py-16 text-center">
          <div className="mb-4 rounded-full bg-gray-200 p-4">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            No movies found
          </h2>
          <p className="text-gray-600">
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Available Movies</h2>
          <p className="mt-1 text-sm text-gray-600">
            Showing {filteredMovies.length} movie
            {filteredMovies.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <ul
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        role="list"
      >
        {filteredMovies.map((movie, index) => (
          <MovieCard
            key={`${movie.id}-${movie.poster}`}
            movie={movie}
            isInCart={isInCart(movie.id)}
            index={index}
          />
        ))}
      </ul>
    </section>
  );
};

interface MovieCardProps {
  movie: Movie;
  isInCart: boolean;
  index?: number;
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
    <li className="group animate-scale-in relative">
      <article
        className={`relative aspect-2/3 overflow-hidden rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-blue-500/20 ${
          isInCart ? "opacity-70 ring-green-500/50" : ""
        }`}
      >
        <Link
          href={`/movie-details/${encodeURIComponent(movie.title)}?price=${moviePrice}`}
          className="block h-full w-full focus:ring-4 focus:ring-blue-500/50 focus:outline-none"
          aria-label={`View details for ${movie.title}`}
        >
          <div className="relative h-full w-full">
            <Image
              src={imgSrc}
              alt={`${movie.title} movie poster`}
              fill
              priority
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={handleImageError}
              unoptimized={!imgSrc.startsWith("/")}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Movie info overlay */}
            <div className="absolute right-0 bottom-0 left-0 translate-y-0 p-4 text-white transition-transform duration-300 group-hover:translate-y-0">
              <h3 className="mb-1.5 line-clamp-2 text-sm leading-tight font-bold drop-shadow-lg md:text-base">
                {movie.title}
              </h3>

              {genresText && (
                <p className="mb-2 line-clamp-1 text-xs text-gray-200 drop-shadow">
                  {genresText}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 rounded-full bg-black/30 px-2 py-1 backdrop-blur-sm">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold">{movieRating}</span>
                </div>

                <span className="rounded-full bg-green-500/90 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                  {moviePrice}kr
                </span>
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-0 ring-2 ring-blue-400 transition-opacity duration-300 ring-inset group-hover:opacity-100" />
          </div>
        </Link>

        {/* Cart indicator */}
        {isInCart && (
          <div
            className="absolute top-3 right-3 animate-bounce rounded-full bg-green-500 p-2 shadow-xl ring-4 ring-white/50"
            aria-label="Item in cart"
          >
            <ShoppingCart className="h-4 w-4 text-white" />
          </div>
        )}
      </article>
    </li>
  );
});

MovieCard.displayName = "MovieCard";

export default memo(MovieList);
