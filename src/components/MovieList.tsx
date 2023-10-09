import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import SearchBar from "./Search";

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

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string | undefined>();
  const [genre, setGenre] = useState<string | undefined>();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response: AxiosResponse<Movie[]> = await axios.get(
          "https://api.tvmaze.com/shows",
        );

        const moviesWithPricesAndGenres = response.data.map((movie) => ({
          ...movie,
          price: getRandomPrice(50, 100),
          genres: movie.genres || ["Unknown"],
        }));

        setMovies(moviesWithPricesAndGenres);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
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
      <SearchBar setSearch={setSearch} setGenre={setGenre} />
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {filteredMovies.map((movie) => (
          <li
            key={movie.id}
            className="flex flex-col items-center rounded-md border p-4"
          >
            <img
              src={movie.image.medium}
              alt={movie.name}
              className="mb-2 h-auto w-full"
            />
            <div className="text-center">
              <div className="text-lg font-semibold">{movie.name}</div>
              <div className="flex-col">Genres: {movie.genres.join(", ")}</div>
              <div>Price: {movie.price} kr</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
