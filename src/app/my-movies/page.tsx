"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useMemo, memo } from "react";

import { api } from "~/trpc/react";
import type { Movie } from "~/types/types";
import SearchBar from "~/components/Search";

// MovieCard component to avoid re-generating random rating on each render
const MovieCard = memo(({ movie }: { movie: Movie }) => {
  // Generate rating once per component using useState initializer
  const [rating] = useState(() => (Math.random() * 2 + 3).toFixed(1));
  const [imgSrc, setImgSrc] = useState(
    movie.poster ?? "/imgs/image-not-found.jpg",
  );

  const handleImageError = () => {
    setImgSrc("/imgs/image-not-found.jpg");
  };

  return (
    <li
      key={movie.id}
      className="relative transform overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-transform hover:scale-105"
    >
      <div className="aspect-w-2 aspect-h-3">
        <Image
          src={imgSrc}
          alt={movie.title}
          width={600}
          height={900}
          priority
          className="object-cover"
          onError={handleImageError}
        />
      </div>
      <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black to-transparent p-4">
        <h3 className="mb-1 text-lg font-semibold text-white">{movie.title}</h3>
        <h4 className="mb-1 text-sm text-gray-400">
          {movie.genres.join(", ")}
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 text-yellow-400" />
            <span className="text-sm text-gray-400">{rating}</span>
          </div>
        </div>
      </div>
    </li>
  );
});

MovieCard.displayName = "MovieCard";

export default function MyMoviesPage() {
  const { data: sessionData, status } = useSession();
  const [search, setSearch] = useState<string | undefined>();
  const [genre, setGenre] = useState<string | undefined>();

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    redirect("/");
  }

  const myMoviesIds = api.user.getMyMovies.useQuery(
    { userId: sessionData?.user?.id ?? "" },
    {
      enabled: !!sessionData,
    },
  ).data?.purchasedMovies;

  const { data: movies } = api.movies.findById.useQuery(
    {
      movieIds: myMoviesIds ?? [],
    },
    {
      enabled: !!myMoviesIds,
    },
  );

  const filteredMovies = useMemo(() => {
    if (!movies) return [];

    return movies.filter((movie) => {
      const isSearchMatch =
        !search || movie.title.toLowerCase().includes(search.toLowerCase());
      const isGenreMatch =
        !genre ||
        genre === "all" ||
        movie.genres.map((g) => g.toLowerCase()).includes(genre.toLowerCase());
      return isSearchMatch && isGenreMatch;
    });
  }, [movies, search, genre]);

  if (status === "loading") {
    return (
      <div className="container mx-auto my-8 px-4">
        <h1 className="mb-6 text-center text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="mb-6 text-center text-3xl font-bold">My Movies</h1>

      <SearchBar setSearch={setSearch} setGenre={setGenre} />

      <ul className="my-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
