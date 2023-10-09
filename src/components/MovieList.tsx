import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface Movie {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  };
  price: number;
  genres: string;
}

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response: AxiosResponse<Movie[]> = await axios.get(
          "https://api.tvmaze.com/shows",
        );

        const movies = response.data.map((movie) => ({
          ...movie,
          price: getRandomPrice(50, 100),
          genre: movie.genres || "Unknown",
        }));

        setMovies(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
  }, []);

  function getRandomPrice(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {movies.map((movie) => (
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
              <div className="flex-col">Genre: {movie.genres}</div>
              <div>Price: {movie.price} kr</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
