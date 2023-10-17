import React, { useState, useEffect } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";

import Link from "next/link";

interface Movie {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  };
  price: number;
  genres: string[];
}

interface SearchProps {
  search: string | undefined;
  genre: string | undefined;
}

export default function MovieList({ search, genre }: SearchProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  console.log("Search: ", search);
  console.log("Genre: ", genre);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response: AxiosResponse<Movie[]> = await axios.get(
          "https://api.tvmaze.com/shows",
        );

        const moviesWithPricesAndGenres = response.data.map((movie) => ({
          ...movie,
          price: getRandomPrice(50, 100),
          genres: movie.genres.length != 0 ? movie.genres : ["Unknown"],
        }));

        console.log(moviesWithPricesAndGenres[93]);

        setMovies(moviesWithPricesAndGenres);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies().catch((error) => console.error(error));
  }, []);
  // Filter movies based on the Search
  const filteredMovies = movies.filter((movie) => {
    const isSearchMatch =
      !search || movie.name.toLowerCase().includes(search.toLowerCase());

    // Filter movies based on the selected genre
    const isGenreMatch =
      !genre ||
      genre === "all" ||
      movie.genres.map((g) => g.toLowerCase()).includes(genre.toLowerCase());

    return isSearchMatch && isGenreMatch;
  });

  function getRandomPrice(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div>
      <ul className="mx-1 grid grid-cols-2 gap-1  md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {filteredMovies.map((movie) => (
          <li
            key={movie.id}
            className="flex flex-col items-center rounded-md border p-3"
          >
            <Link
              href="/movie-details/[movie]"
              as={`/movie-details/${movie.name}`}
            >
              <img
                src={movie.image.medium}
                alt={movie.name}
                className="mb-2 h-auto w-full"
              />
              <div className="text-center">
                <div className="text-lg font-semibold">{movie.name}</div>
                <div className="flex flex-col">
                  <h2>Genres:&nbsp;</h2>
                  <div>{movie.genres.join(", ")}</div>
                </div>
                <div>Price: {movie.price} kr</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
