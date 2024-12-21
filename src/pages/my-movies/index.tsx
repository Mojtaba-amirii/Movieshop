import React, { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import type { Movie } from "~/types/types";
import SearchBar from "~/components/Search";
import { Star } from "lucide-react";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

async function checkURL(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default function MyMovies() {
  const { data: sessionData } = useSession();
  const [validatedMovies, setValidatedMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string | undefined>();
  const [genre, setGenre] = useState<string | undefined>();

  const myMoviesIds = api.user.getMyMovies.useQuery(
    { userId: sessionData?.user?.id ?? "" },
    {
      queryKey: ["user.getMyMovies", { userId: sessionData?.user?.id ?? "" }],
      enabled: !!sessionData,
    },
  ).data?.purchasedMovies;

  const { data: movies } = api.movies.findById.useQuery(
    {
      movieIds: myMoviesIds ?? [],
    },
    {
      queryKey: ["movies.findById", { movieIds: myMoviesIds ?? [] }],
      enabled: !!myMoviesIds,
    },
  );

  const validateMovies = useCallback(async (movies: Movie[]) => {
    try {
      const updatedMovies = await Promise.all(
        movies.map(async (movie) => {
          const movieWithPrice = { ...movie, price: movie.price ?? 0 };
          if (movieWithPrice.poster) {
            const isValid = await checkURL(movieWithPrice.poster);
            return isValid
              ? movieWithPrice
              : { ...movieWithPrice, poster: "/imgs/image-not-found.jpg" };
          } else {
            return { ...movieWithPrice, poster: "/imgs/image-not-found.jpg" };
          }
        }),
      );
      setValidatedMovies(updatedMovies);
    } catch (error) {
      console.error("Error validating movies:", error);
    }
  }, []);

  useEffect(() => {
    if (movies) {
      validateMovies(movies).catch((error) => {
        console.error("Error validating movies:", error);
      });
    }
  }, [movies, validateMovies]);

  const filteredMovies = useMemo(() => {
    return validatedMovies.filter((movie) => {
      const isSearchMatch =
        !search || movie.title.toLowerCase().includes(search.toLowerCase());
      const isGenreMatch =
        !genre ||
        genre === "all" ||
        movie.genres.map((g) => g.toLowerCase()).includes(genre.toLowerCase());
      return isSearchMatch && isGenreMatch;
    });
  }, [validatedMovies, search, genre]);

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="mb-6 text-center text-3xl font-bold">My Movies</h1>

      <SearchBar setSearch={setSearch} setGenre={setGenre} />

      <ul className="my-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredMovies.map((movie) => (
          <li
            key={movie.id}
            className="relative transform overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-transform hover:scale-105"
          >
            <div className="aspect-w-2 aspect-h-3">
              <Image
                src={movie.poster ?? "/imgs/image-not-found.jpg"}
                alt={movie.title}
                width={600}
                height={900}
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="mb-1 text-lg font-semibold text-white">
                {movie.title}
              </h3>
              <h4 className="mb-1 text-sm text-gray-400">
                {movie.genres.join(", ")}
              </h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-gray-400">
                    {(Math.random() * 2 + 3).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
