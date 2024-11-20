import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import type { MovieWithPrice, SearchProps } from "~/types/types";
import { useSelector } from "~/redux/store";
import type { RootState } from "~/redux/types";
import { generateRandomPrice } from "~/utils/utils";
import { ShoppingCart, Star } from "lucide-react";

async function checkURL(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch (error) {
    return false;
  }
}

export default function MovieList({ search, genre }: SearchProps) {
  const { data: sessionData } = useSession();
  const [validatedMovies, setValidatedMovies] = useState<MovieWithPrice[]>();
  const myMoviesIds = api.user.getMyMovies.useQuery(
    { userId: sessionData?.user?.id ?? "" },
    {
      queryKey: ["user.getMyMovies", { userId: sessionData?.user?.id ?? "" }],
      enabled: sessionData !== null,
    },
  ).data?.purchasedMovies;
  const cartMovies = useSelector((state: RootState) => state.cart.items);

  const movies = api.movies.first100.useQuery().data;

  useEffect(() => {
    console.log("hej");
    if (movies) {
      const moviesWithPrice = movies.map((movie) => {
        return { ...movie, price: generateRandomPrice() };
      });
      Promise.all(
        moviesWithPrice.map(async (movie: MovieWithPrice) => {
          if (movie.poster) {
            return checkURL(movie.poster).then((result: boolean) => {
              if (result) {
                console.log("YES!");
                return movie;
              } else {
                console.log("NO!");
                return { ...movie, poster: "/imgs/image-not-found.jpg" };
              }
            });
          } else {
            return Promise.resolve({
              ...movie,
              poster: "/image-not-found.jpg",
            });
          }
        }),
      )
        .then((updatedMovies) => {
          if (sessionData) {
            const myMoviesChecked = updatedMovies.filter(
              (movie) => !myMoviesIds?.includes(movie.id),
            );
            setValidatedMovies(myMoviesChecked);
          } else {
            setValidatedMovies(updatedMovies);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [movies, sessionData, myMoviesIds]);

  console.log("Search: ", search);
  console.log("Genre: ", genre);

  // Filter movies based on the Search
  const filteredMovies = validatedMovies?.filter((movie: MovieWithPrice) => {
    if (movie) {
      const isSearchMatch =
        !search || movie.title.toLowerCase().includes(search.toLowerCase());

      // Filter movies based on the selected genre
      const isGenreMatch =
        !genre ||
        genre === "all" ||
        movie.genres.map((g) => g.toLowerCase()).includes(genre.toLowerCase());

      return isSearchMatch && isGenreMatch;
    }
    return false;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <ul className="grid grid-cols-2 gap-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredMovies?.map((movie) =>
          sessionData ? (
            <li
              key={movie.id}
              className="relative overflow-hidden rounded-lg bg-gray-300 shadow-lg"
            >
              <Link
                href={{
                  pathname: "/movie-details/[movie]",
                  query: {
                    price: movie.price,
                  },
                }}
                as={`/movie-details/${movie.title}`}
              >
                <div
                  className={`${
                    cartMovies.filter((cartMovie) => cartMovie.id === movie.id)
                      .length !== 0 && "opacity-40"
                  } aspect-w-2 aspect-h-3`}
                >
                  <Image
                    src={movie.poster ?? "/imgs/image-not-found.jpg"}
                    alt={movie.title}
                    width={600}
                    height={696}
                    priority
                    className="object-cover transition-opacity duration-300 hover:opacity-75"
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
                        {(Math.random() * 2 + 3).toFixed(1)}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-green-400">
                      ${movie.price}
                    </span>
                  </div>
                </div>
                {cartMovies.some((cartMovie) => cartMovie.id === movie.id) && (
                  <div className="absolute right-2 top-2 rounded-full bg-green-500 p-2">
                    <ShoppingCart className="h-4 w-4 text-white" />
                  </div>
                )}
              </Link>
            </li>
          ) : (
            <li
              key={movie.id}
              className="relative overflow-hidden rounded-lg bg-gray-300 shadow-lg"
            >
              <Link
                href={{
                  pathname: "/movie-details/[movie]",
                  query: {
                    price: movie.price,
                  },
                }}
                as={`/movie-details/${movie.title}`}
              >
                <div className="aspect-w-2 aspect-h-3">
                  <Image
                    src={movie.poster ?? "/imgs/image-not-found.jpg"}
                    alt={movie.title}
                    width={600}
                    height={696}
                    priority
                    className="object-cover transition-opacity duration-300 hover:opacity-75"
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
                        {(Math.random() * 2 + 3).toFixed(1)}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-green-400">
                      ${movie.price}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
