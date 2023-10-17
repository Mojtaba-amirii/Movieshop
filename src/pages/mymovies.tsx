import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Movie } from "./movie-details/[movie]";

export default function Mymovies() {
  const [myMovies, setMyMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response: AxiosResponse<Movie[]> = await axios.get(
          "https://api.tvmaze.com/shows",
        );

        const moviesWithPricesAndGenres = response.data.map((cartMovie) => ({
          ...cartMovie,
          price: getRandomPrice(50, 100),
          genres:
            cartMovie.genres.length !== 0 ? cartMovie.genres : ["Unknown"],
        }));

        setMyMovies(moviesWithPricesAndGenres.slice(0, 3));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();

    function getRandomPrice(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, []);

  // Function to add a movie to the cart
  const addMovieToCart = (movie: Movie) => {
    setMyMovies([...myMovies, movie]);
  };

  // Function to remove a movie from the cart
  const removeMovieFromCart = (movie: Movie) => {
    const updatedCart = myMovies.filter((myMovie) => myMovie !== movie);
    setMyMovies(updatedCart);
  };

  return (
    <div className=" container mx-auto  px-4">
      <h1 className="mb-4 text-center text-2xl font-semibold">My Movies</h1>
      <ul className="mx-1 grid grid-cols-2 gap-1  md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {myMovies.map((movie, index) => (
          <li
            key={index}
            className="mx-auto flex w-full flex-col items-center gap-6 rounded-xl border bg-gray-100 p-3"
          >
            <img
              src={movie.image.medium}
              alt={movie.name}
              className="h-26 w-24 sm:h-32 sm:w-24 md:h-40 md:w-32 lg:h-48 lg:w-36 xl:h-56 xl:w-40"
            />
            <div className="flex flex-1 flex-col items-center gap-8">
              <p className="sm:text-md md:text-md lg:text-l lg:text-l text-sm">
                {movie.name}
              </p>
              <p className=" text-xs sm:text-base md:text-sm">
                {`Price: ${movie.price} kr`}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
