import React, { useState, useEffect } from "react";
import { Movie } from "../movie-details/[movie]";
import axios, { AxiosResponse } from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import Link from "next/link";

export default function ShoppingCart() {
  const [cartMovies, setCartMovies] = useState<Movie[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

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

        setCartMovies(moviesWithPricesAndGenres.slice(0, 3));
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
    setCartMovies([...cartMovies, movie]);
  };

  // Function to remove a movie from the cart
  const removeMovieFromCart = (movie: Movie) => {
    const updatedCart = cartMovies.filter((cartMovie) => cartMovie !== movie);
    setCartMovies(updatedCart);
  };

  // Calculate the total price using reduce
  useEffect(() => {
    const totalPrice = cartMovies.reduce(
      (acc, movie) => acc + Number(movie.price),
      0,
    );
    setTotalPrice(totalPrice);
  }, [cartMovies]);

  return (
    <div className="mx-auto my-10 flex w-full flex-col items-center gap-8">
      <h1 className="text-center text-2xl font-semibold">Your Movies</h1>
      <ul className="flex flex-col gap-4">
        {cartMovies.map((movie, index) => (
          <li
            key={index}
            className="mx-auto flex w-full flex-row items-center gap-6 rounded-xl border bg-gray-200 p-3"
          >
            <img
              src={movie.image.medium}
              alt={movie.name}
              className="h-24 w-20 sm:h-32 sm:w-24 md:h-40 md:w-32 lg:h-48 lg:w-36 xl:h-56 xl:w-40"
            />
            <div className="flex flex-1 flex-row items-center gap-8">
              <p className="sm:text-md md:text-l text-sm lg:text-xl xl:text-2xl">
                {movie.name}
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                {`Price: ${movie.price} kr`}
              </p>
              <div className="flex items-center">
                <button
                  title="button"
                  type="button"
                  onClick={() => removeMovieFromCart(movie)}
                  className="flex-0 text-2xl text-red-500 hover:text-red-700"
                >
                  <AiFillCloseCircle />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {totalPrice !== 0 && (
        <p className="sm:text-md md:text-l text-sm lg:text-xl xl:text-2xl">
          {`Total: ${totalPrice} kr`}
        </p>
      )}
      <Link href="/cart-pages/PaymentPage">
        <button
          type="button"
          className="sm:text-md md:text-l rounded-md border border-black bg-sky-400 px-4 py-2 text-sm lg:text-xl xl:text-2xl"
        >
          To Payment
        </button>
      </Link>
    </div>
  );
}
